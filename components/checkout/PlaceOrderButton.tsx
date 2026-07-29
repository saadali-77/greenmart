"use client";

interface PlaceOrderButtonProps {
  loading?: boolean;
}

export default function PlaceOrderButton({
  loading = false,
}: PlaceOrderButtonProps) {
  return (
    <button
      type="submit"
      disabled={loading}
      className="w-full rounded-xl bg-green-600 py-4 text-lg font-semibold text-white transition hover:bg-green-700 disabled:cursor-not-allowed disabled:bg-gray-400"
    >
      {loading ? "Placing Order..." : "Place Order"}
    </button>
  );
}