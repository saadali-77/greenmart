export interface CartItem {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discount: number;
  image: string;
  stock: number;
  quantity: number;
}