export interface Category {
  id: string;
  name: string;
  image?: string | null;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  discount: number;
  description: string;
  price: number;
  image: string;
  stock: number;
  featured: boolean;
  category: Category;
}
export type User = {
  id: string;
  name: string | null;
  email: string;
  role: "USER" | "ADMIN";
  createdAt: Date;
};