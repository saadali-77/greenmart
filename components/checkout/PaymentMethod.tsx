"use client";

import { CreditCard, Truck } from "lucide-react";
import { useFormContext, UseFormRegister } from "react-hook-form";

import { CheckoutFormData } from "@/lib/validation/checkout";

interface PaymentMethodProps {
  register?: UseFormRegister<CheckoutFormData>;
}

export default function PaymentMethod({
  register: registerProp,
}: PaymentMethodProps) {
  const formContext = useFormContext<CheckoutFormData>();
  const register = registerProp ?? formContext.register;

  if (!register) {
    return null;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold">
        Payment Method
      </h2>

      {/* Cash on Delivery */}
      <label className="flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition hover:border-green-600 has-[:checked]:border-green-600 has-[:checked]:bg-green-50">
        <input
          type="radio"
          value="COD"
          {...register("paymentMethod")}
          className="radio radio-success"
        />

        <Truck className="text-green-600" size={24} />

        <div>
          <p className="font-semibold">
            Cash on Delivery
          </p>

          <p className="text-sm text-gray-500">
            Pay when your order arrives.
          </p>
        </div>
      </label>

      {/* Stripe */}
      <label className="flex cursor-not-allowed items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4 opacity-70">
        <input
          type="radio"
          value="STRIPE"
          {...register("paymentMethod")}
          disabled
          className="radio"
        />

        <CreditCard className="text-gray-400" size={24} />

        <div>
          <p className="font-semibold text-gray-500">
            Credit / Debit Card
          </p>

          <p className="text-sm text-gray-400">
            Stripe integration coming soon.
          </p>
        </div>
      </label>
    </div>
  );
}