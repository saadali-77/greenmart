import { Product } from "@/types/product";

export const products: Product[] = [
  {
    id: "1",
    name: "Donut Cake",
    slug: "donut-cake",
    discount: 25,
    description: "Soft and delicious donut cake made with premium ingredients",
    price: 850,
    image: "/products/donut.jpg",
    stock: 25,
    featured: true,
    category: {
      id: "cat-1",
      name: "Bakery",
      image: "/categories/bakery.jpg",
    },
  },
  {
    id: "2",
    name: "Premium Peanuts",
    slug: "premium-peanuts",
    discount: 15,
    description: "Fresh roasted peanuts with rich taste and quality",
    price: 450,
    image: "/products/peanuts.jpg",
    stock: 60,
    featured: true,
    category: {
      id: "cat-2",
      name: "Snacks",
      image: "/categories/snacks.jpg",
    },
  },
  {
    id: "3",
    name: "Fresh Butter",
    slug: "fresh-butter",
    discount: 20,
    description: "Creamy fresh butter perfect for cooking and baking",
    price: 600,
    image: "/products/butter.jpg",
    stock: 35,
    featured: false,
    category: {
      id: "cat-3",
      name: "Dairy",
      image: "/categories/dairy.jpg",
    },
  },
];