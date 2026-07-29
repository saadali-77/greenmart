import Link from "next/link";

export default function EmptyCart() {
  return (
    <div className="rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
      <h2 className="text-2xl font-semibold text-gray-800">Your cart is empty</h2>
      <p className="mt-2 text-gray-500">Add some fresh items to get started.</p>
      <Link
        href="/products"
        className="mt-6 inline-flex rounded-xl bg-green-600 px-5 py-3 font-semibold text-white hover:bg-green-700"
      >
        Continue Shopping
      </Link>
    </div>
  );
}
