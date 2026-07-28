export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  image: string;
  stock: number;
  featured: boolean;
  category: Category;
}