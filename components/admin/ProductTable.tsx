import Image from "next/image";
import Link from "next/link";

type Product = {
  id: string;
  name: string;
  image: string;
  price: number;
  stock: number;
  featured: boolean;
  category: {
    name: string;
  };
};

interface ProductsTableProps {
  products: Product[];
}

export default function ProductsTable({
  products,
}: ProductsTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl bg-base-100 shadow">
      <table className="table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Featured</th>
            <th className="text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {products.length === 0 ? (
            <tr>
              <td colSpan={7} className="py-10 text-center">
                No products found.
              </td>
            </tr>
          ) : (
            products.map((product) => (
              <tr key={product.id}>
                <td>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={60}
                    height={60}
                    className="rounded-lg object-cover"
                  />
                </td>

                <td className="font-semibold">
                  {product.name}
                </td>

                <td>{product.category.name}</td>

                <td>Rs. {product.price}</td>

                <td>
                  <span
                    className={`badge ${
                      product.stock > 0
                        ? "badge-success"
                        : "badge-error"
                    }`}
                  >
                    {product.stock}
                  </span>
                </td>

                <td>
                  {product.featured ? (
                    <span className="badge badge-primary">
                      Yes
                    </span>
                  ) : (
                    <span className="badge">
                      No
                    </span>
                  )}
                </td>

                <td>
                  <div className="flex justify-end gap-2">
                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="btn btn-sm btn-info"
                    >
                      Edit
                    </Link>

                    <button className="btn btn-sm btn-error">
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}