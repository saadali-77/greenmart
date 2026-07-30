"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  checkoutSchema,
  CheckoutFormData,
} from "@/lib/validation/checkout";

import { useAppDispatch, useAppSelector } from '@/Store/hooks';
import { clearCart } from '@/Store/features/Cart/cartSlice'

import PaymentMethod from "./PaymentMethod";
import PlaceOrderButton from "./PlaceOrderButton";

export default function CheckoutForm() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const cartItems = useAppSelector((state) => state.cart.items);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      postalCode: "",
      country: "Pakistan",
      notes: "",
      paymentMethod: "COD",
    },
  });

  const onSubmit = async (data: CheckoutFormData) => {
    try {
      if (cartItems.length === 0) {
        alert("Your cart is empty.");
        return;
      }

      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...data,
          items: cartItems,
        }),
      });

      const contentType = response.headers.get("content-type") || "";
      const responseText = await response.text();
      let result: any = null;

      if (contentType.includes("application/json")) {
        try {
          result = JSON.parse(responseText);
        } catch (parseError) {
          console.error("Failed to parse JSON response:", parseError, responseText);
          alert("Received invalid server response. Please try again.");
          return;
        }
      } else {
        console.error("Unexpected checkout response:", response.status, responseText);
        alert(
          response.ok
            ? "Received unexpected server response."
            : responseText || "Failed to place order."
        );
        return;
      }

      if (!response.ok) {
        alert(result?.message || "Failed to place order.");
        return;
      }

      dispatch(clearCart());

      router.push(`/order-success?id=${result.order.id}`);
    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 rounded-2xl border bg-white p-6 shadow-sm"
    >
      <h2 className="text-2xl font-bold">
        Shipping Information
      </h2>

      <div className="grid gap-5 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            First Name
          </label>

          <input
            {...register("firstName")}
            placeholder="John"
            autoComplete="given-name"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.firstName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.firstName.message}
            </p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Last Name
          </label>

          <input
            {...register("lastName")}
            placeholder="Doe"
            autoComplete="family-name"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.lastName && (
            <p className="mt-1 text-sm text-red-500">
              {errors.lastName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Email
          </label>

          <input
            type="email"
            {...register("email")}
            placeholder="john@example.com"
            autoComplete="email"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.email && (
            <p className="mt-1 text-sm text-red-500">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Phone
          </label>

          <input
            {...register("phone")}
            placeholder="03001234567"
            autoComplete="tel"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.phone && (
            <p className="mt-1 text-sm text-red-500">
              {errors.phone.message}
            </p>
          )}
        </div>
      </div>

      {/* Address */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Address
        </label>

        <textarea
          rows={3}
          {...register("address")}
          placeholder="House #12, Street 5..."
          autoComplete="street-address"
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
        />

        {errors.address && (
          <p className="mt-1 text-sm text-red-500">
            {errors.address.message}
          </p>
        )}
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        {/* City */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            City
          </label>

          <input
            {...register("city")}
            placeholder="Lahore"
            autoComplete="address-level2"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.city && (
            <p className="mt-1 text-sm text-red-500">
              {errors.city.message}
            </p>
          )}
        </div>

        {/* Postal Code */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Postal Code
          </label>

          <input
            {...register("postalCode")}
            placeholder="54000"
            autoComplete="postal-code"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.postalCode && (
            <p className="mt-1 text-sm text-red-500">
              {errors.postalCode.message}
            </p>
          )}
        </div>

        {/* Country */}
        <div>
          <label className="mb-2 block text-sm font-medium">
            Country
          </label>

          <input
            {...register("country")}
            autoComplete="country-name"
            className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
          />

          {errors.country && (
            <p className="mt-1 text-sm text-red-500">
              {errors.country.message}
            </p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div>
        <label className="mb-2 block text-sm font-medium">
          Order Notes (Optional)
        </label>

        <textarea
          rows={4}
          {...register("notes")}
          placeholder="Any delivery instructions..."
          className="w-full rounded-xl border px-4 py-3 outline-none transition focus:border-green-600"
        />
      </div>

      <PaymentMethod register={register} />

      <PlaceOrderButton loading={isSubmitting} />
    </form>
  );
}