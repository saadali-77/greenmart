const categories = [
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
  "Beverages",
  "Snacks"
];


export default function Categories(){

  return (

    <section className="max-w-7xl mx-auto px-6 py-16">

      <h2 className="text-3xl font-bold mb-8">
        Shop By Category
      </h2>


      <div className="grid grid-cols-2 md:grid-cols-6 gap-5">

        {
          categories.map((category)=>(
            
            <div
              key={category}
              className="bg-white shadow rounded-xl p-6 text-center hover:shadow-lg cursor-pointer"
            >

              <div className="text-4xl">
                🛒
              </div>

              <p className="mt-3 font-semibold">
                {category}
              </p>

            </div>

          ))
        }

      </div>

    </section>

  );
}