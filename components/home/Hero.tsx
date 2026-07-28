export default function Hero() {
  return (
    <section className="bg-green-50 py-20">

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-10 items-center">

        <div>

          <h1 className="text-5xl font-bold text-green-700">
            Fresh Groceries Delivered To Your Door
          </h1>

          <p className="mt-5 text-gray-600 text-lg">
            Shop fresh fruits, vegetables, dairy products and daily essentials from GreenMart.
          </p>


          <button className="mt-8 bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700">
            Shop Now
          </button>

        </div>


        <div className="bg-green-200 h-80 rounded-2xl flex items-center justify-center">

          <span className="text-6xl">
            🥦🍎🛒
          </span>

        </div>


      </div>

    </section>
  );
}