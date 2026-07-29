import ProductCard from '@/components/products/productCard';
    import { products } from '@/src/data/products';

export default function ProductGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

      {products.map((product) => (
        <ProductCard
        category=''
          key={product.id}
          name={product.name}
          price={product.price}
          discount={30}
          
          image={product.image}
        />
      ))}

    </div>
  );
}