const products = [
  {
    name:"Fresh Apples",
    price:250
  },
  {
    name:"Organic Milk",
    price:180
  },
  {
    name:"Fresh Bread",
    price:120
  },
  {
    name:"Orange Juice",
    price:300
  }
];


export default function FeaturedProducts(){

return (

<section className="max-w-7xl mx-auto px-6 py-16">


<h2 className="text-3xl font-bold mb-8">
Featured Products
</h2>


<div className="grid md:grid-cols-4 gap-6">


{
products.map(product=>(

<div
key={product.name}
className="border rounded-xl p-5 hover:shadow-lg"
>

<div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center text-5xl">
🍎
</div>


<h3 className="font-bold mt-4">
{product.name}
</h3>


<p className="text-green-600 font-semibold mt-2">
Rs. {product.price}
</p>


<button className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg">
Add To Cart
</button>


</div>

))
}


</div>


</section>

);

}