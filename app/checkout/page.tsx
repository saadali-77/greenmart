"use client";

import CheckoutForm from "@/components/checkout/CheckoutForm";
import OrderSummary from "@/components/checkout/OrderSummary";

export default function CheckoutPage() {
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <h1 className="mb-8 text-3xl font-bold text-gray-900">Checkout</h1>

      <div className="grid gap-8 lg:grid-cols-[1.5fr_0.9fr]">
        <CheckoutForm />

        <div className="space-y-6">
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
