import {
  configureStore,
  combineReducers,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";
import {
  persistReducer,
  persistStore,
} from "redux-persist";

import storage from "./storage";
import cartReducer, {
  addToCart,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
} from "./features/Cart/cartSlice";
import { scheduleCartSave } from "./features/Cart/cartSync";

const rootReducer = combineReducers({
  cart: cartReducer,
});

const persistConfig = {
  key: "greenmart",
  storage,
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Pushes user-made cart changes to the server. setCart/resetCart are left
// out on purpose so hydrating or wiping the local copy never writes back.
const cartSyncListener = createListenerMiddleware();

cartSyncListener.startListening({
  matcher: isAnyOf(
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    clearCart
  ),
  effect: (_action, listenerApi) => {
    scheduleCartSave(
      () =>
        (listenerApi.getState() as ReturnType<typeof rootReducer>)
          .cart.items
    );
  },
});

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).prepend(cartSyncListener.middleware),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;