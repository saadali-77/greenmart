interface OrderSuccessPageProps {
  searchParams: {
    id?: string;
  };
}

export default async function OrderSuccessPage({
  searchParams,
}: OrderSuccessPageProps) {
  const { id } = await searchParams;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-20">
      <div className="rounded-2xl border bg-white p-10 text-center shadow">
        <div className="mb-6 text-6xl">🎉</div>

        <h1 className="mb-4 text-3xl font-bold text-green-600">
          Order Placed Successfully!
        </h1>

        <p className="mb-2 text-gray-600">
          Thank you for shopping with GreenMart.
        </p>

        <p className="mb-6 text-gray-600">
          Your order has been received and is being processed.
        </p>

        {id && (
          <div className="mb-8 rounded-lg bg-gray-100 p-4">
            <p className="text-sm text-gray-500">
              Order ID
            </p>

            <p className="mt-2 break-all font-mono font-semibold">
              {id}
            </p>
          </div>
        )}

        <a
          href="/"
          className="inline-block rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-700"
        >
          Continue Shopping
        </a>
      </div>
    </div>
  );
}