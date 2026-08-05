"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { AlertCircle, ImageOff, Loader2 } from "lucide-react";

import { updateProduct ,deleteProduct} from "@/app/(Admin)/admin/products/action";

type Product = {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  featured: boolean;
  categoryId: string;
};

type Category = { id: string; name: string };

interface EditProductFormProps {
  product: Product;
  categories: Category[];
}

const NUMERIC_FIELDS = ["price", "discount", "stock"] as const;

export default function EditProductForm({ product, categories }: EditProductFormProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: product.name,
    description: product.description,
    price: product.price,
    discount: product.discount,
    stock: product.stock,
    image: product.image,
    featured: product.featured,
    categoryId: product.categoryId,
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : NUMERIC_FIELDS.includes(name as (typeof NUMERIC_FIELDS)[number])
            ? Number(value)
            : value,
    }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    startTransition(async () => {
      try {
        await updateProduct(product.id, formData);
        router.push("/admin/products");
        router.refresh();
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong.");
      }
    });
  }

  const finalPrice = formData.price - (formData.price * formData.discount) / 100;

  return (
    <div className="min-h-screen bg-base-200 px-4 py-10">
      <div className="mx-auto max-w-4xl">
        <header className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight">Edit Product</h1>
          <p className="mt-1 text-sm opacity-70">
            Update details for <span className="font-medium">{product.name}</span>
          </p>
        </header>

        <div className="card border border-base-300 bg-base-100 shadow-sm">
          <form onSubmit={handleSubmit} className="card-body gap-6 p-6 md:p-8">
            {error && (
              <div role="alert" className="alert alert-error">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <section className="grid gap-5 md:grid-cols-2">
              <label className="form-control">
                <span className="label-text mb-1 font-medium">Product Name</span>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="e.g. Wireless Headphones"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-1 font-medium">Category</span>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="select select-bordered w-full"
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </label>
            </section>

            <label className="form-control">
              <span className="label-text mb-1 font-medium">Description</span>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="textarea textarea-bordered w-full leading-relaxed"
                placeholder="Describe the product…"
                required
              />
            </label>

            <section className="grid gap-5 md:grid-cols-[1fr_auto] md:items-start">
              <label className="form-control">
                <span className="label-text mb-1 font-medium">Image URL</span>
                <input
                  type="text"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  placeholder="https://…"
                  required
                />
                <span className="label-text-alt mt-1 opacity-60">
                  Square images look best in the catalog.
                </span>
              </label>

              <div className="flex h-32 w-32 items-center justify-center overflow-hidden rounded-xl border border-base-300 bg-base-200">
                {formData.image ? (
                  <img
                    src={formData.image}
                    alt={formData.name || "Product preview"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <ImageOff className="h-6 w-6 opacity-40" />
                )}
              </div>
            </section>

            <div className="divider my-0" />

            <section className="grid grid-cols-2 gap-5 md:grid-cols-4">
              <label className="form-control">
                <span className="label-text mb-1 font-medium">Price</span>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-1 font-medium">Discount %</span>
                <input
                  type="number"
                  name="discount"
                  min={0}
                  max={100}
                  value={formData.discount}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                />
              </label>

              <label className="form-control">
                <span className="label-text mb-1 font-medium">Stock</span>
                <input
                  type="number"
                  name="stock"
                  min={0}
                  value={formData.stock}
                  onChange={handleChange}
                  className="input input-bordered w-full"
                  required
                />
              </label>

              <label className="form-control justify-center">
                <span className="label-text mb-1 font-medium">Featured</span>
                <div className="flex h-12 items-center gap-3 rounded-lg border border-base-300 px-3">
                  <input
                    type="checkbox"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleChange}
                    className="toggle toggle-primary"
                  />
                  <span className="text-sm opacity-70">
                    {formData.featured ? "Visible" : "Hidden"}
                  </span>
                </div>
              </label>
            </section>

            {formData.discount > 0 && (
              <p className="text-sm opacity-70">
                Final price after discount:{" "}
                <span className="font-semibold text-primary">${finalPrice.toFixed(2)}</span>
              </p>
            )}

            <footer className="flex flex-col-reverse gap-3 border-t border-base-300 pt-6 sm:flex-row sm:justify-end">
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => router.push("/admin/products")}
                disabled={isPending}
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary min-w-40" disabled={isPending}>
                {isPending ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Saving…
                  </>
                ) : (
                  "Update Product"
                )}
              </button>
            </footer>
          </form>
        </div>
      </div>
    </div>
  );
}

