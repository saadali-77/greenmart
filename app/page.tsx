
import Hero from "@/components/home/Hero";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/home/FeaturedProducts";
import Offers from "@/components/home/Offers";
import ProductGrid from "@/components/products/productGrid";

export default function Home(){

return (

<>

<Hero />

<Categories />

<FeaturedProducts />

<Offers />

<section className="max-w-7xl mx-auto px-6 py-12">

  <h2 className="text-3xl font-bold mb-6">
    Popular Products
  </h2>

  <ProductGrid />

</section>
</>

)

}