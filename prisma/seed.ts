import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Clear existing data
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  // Categories
  const fruits = await prisma.category.create({
    data: {
      name: "Fruits",
      image: "/categories/fruits.png",
    },
  });

  const vegetables = await prisma.category.create({
    data: {
      name: "Vegetables",
      image: "/categories/vegetables.png",
    },
  });

  const dairy = await prisma.category.create({
    data: {
      name: "Dairy",
      image: "/categories/dairy.png",
    },
  });

  const bakery = await prisma.category.create({
    data: {
      name: "Bakery",
      image: "/categories/bakery.png",
    },
  });

  const beverages = await prisma.category.create({
    data: {
      name: "Beverages",
      image: "/categories/beverages.png",
    },
  });

  const snacks = await prisma.category.create({
    data: {
      name: "Snacks",
      image: "/categories/snacks.png",
    },
  });

  // Products
 await prisma.product.createMany({
  data: [
    
    {
      name: "Fresh Apples",
      slug: "fresh-apples",
      description: "Sweet and juicy apples.",
      price: 350,
      image: "/products/apple.jpg",
      stock: 50,
      featured: true,
      categoryId: fruits.id,
    },
    {
      name: "Fresh Bananas",
      slug: "fresh-bananas",
      description: "Organic bananas.",
      price: 180,
      image: "/products/banana.jpg",
      stock: 80,
      featured: true,
      categoryId: fruits.id,
    },
    {
      name: "Mango",
      slug: "mango",
      description: "Fresh seasonal mangoes.",
      price: 420,
      image: "/products/mango.jpg",
      stock: 35,
      featured: true,
      categoryId: fruits.id,
    },
    {
      name: "Orange",
      slug: "orange",
      description: "Sweet and juicy oranges.",
      price: 260,
      image: "/products/orange.jpg",
      stock: 45,
      featured: false,
      categoryId: fruits.id,
    },

    // ================= Vegetables =================
    {
      name: "Carrots",
      slug: "carrots",
      description: "Farm fresh carrots.",
      price: 140,
      image: "/products/carrot.jpg",
      stock: 60,
      featured: false,
      categoryId: vegetables.id,
    },
    {
      name: "Tomatoes",
      slug: "tomatoes",
      description: "Fresh red tomatoes.",
      price: 160,
      image: "/products/tomato.jpg",
      stock: 70,
      featured: false,
      categoryId: vegetables.id,
    },
    {
      name: "Potatoes",
      slug: "potatoes",
      description: "Premium quality potatoes.",
      price: 120,
      image: "/products/potato.jpg",
      stock: 100,
      featured: true,
      categoryId: vegetables.id,
    },
    {
      name: "Onions",
      slug: "onions",
      description: "Fresh onions.",
      price: 150,
      image: "/products/onion.jpg",
      stock: 90,
      featured: false,
      categoryId: vegetables.id,
    },

    // ================= Dairy =================
    {
      name: "Fresh Milk",
      slug: "fresh-milk",
      description: "Pure dairy milk.",
      price: 220,
      image: "/products/milk.jpg",
      stock: 40,
      featured: true,
      categoryId: dairy.id,
    },
    {
      name: "Cheddar Cheese",
      slug: "cheddar-cheese",
      description: "Premium cheddar cheese.",
      price: 650,
      image: "/products/cheese.jpg",
      stock: 25,
      featured: true,
      categoryId: dairy.id,
    },
    {
      name: "Butter",
      slug: "butter",
      description: "Creamy salted butter.",
      price: 420,
      image: "/products/butter.jpg",
      stock: 40,
      featured: false,
      categoryId: dairy.id,
    },
    {
      name: "Yogurt",
      slug: "yogurt",
      description: "Fresh plain yogurt.",
      price: 180,
      image: "/products/yogurt.jpg",
      stock: 55,
      featured: false,
      categoryId: dairy.id,
    },

    // ================= Bakery =================
    {
      name: "Brown Bread",
      slug: "brown-bread",
      description: "Soft whole wheat bread.",
      price: 180,
      image: "/products/bread.jpg",
      stock: 35,
      featured: false,
      categoryId: bakery.id,
    },
    {
      name: "Chocolate Muffin",
      slug: "chocolate-muffin",
      description: "Fresh baked chocolate muffin.",
      price: 150,
      image: "/products/muffin.jpg",
      stock: 30,
      featured: true,
      categoryId: bakery.id,
    },
    {
      name: "Croissant",
      slug: "croissant",
      description: "Flaky butter croissant.",
      price: 220,
      image: "/products/croissant.jpg",
      stock: 28,
      featured: true,
      categoryId: bakery.id,
    },
    {
      name: "Donut",
      slug: "donut",
      description: "Chocolate glazed donut.",
      price: 130,
      image: "/products/donut.jpg",
      stock: 45,
      featured: false,
      categoryId: bakery.id,
    },

    // ================= Beverages =================
    {
      name: "Orange Juice",
      slug: "orange-juice",
      description: "100% fresh orange juice.",
      price: 280,
      image: "/products/orange-juice.jpg",
      stock: 45,
      featured: true,
      categoryId: beverages.id,
    },
    {
      name: "Green Tea",
      slug: "green-tea",
      description: "Healthy green tea.",
      price: 450,
      image: "/products/green-tea.jpg",
      stock: 50,
      featured: false,
      categoryId: beverages.id,
    },
    {
      name: "Mineral Water",
      slug: "mineral-water",
      description: "Pure drinking water.",
      price: 80,
      image: "/products/water.jpg",
      stock: 150,
      featured: false,
      categoryId: beverages.id,
    },
    {
      name: "Coffee",
      slug: "coffee",
      description: "Premium instant coffee.",
      price: 750,
      image: "/products/coffee.jpg",
      stock: 35,
      featured: true,
      categoryId: beverages.id,
    },

    // ================= Snacks =================
    {
      name: "Potato Chips",
      slug: "potato-chips",
      description: "Crispy salted potato chips.",
      price: 120,
      image: "/products/chips.jpg",
      stock: 100,
      featured: true,
      categoryId: snacks.id,
    },
    {
      name: "Chocolate Cookies",
      slug: "chocolate-cookies",
      description: "Crunchy chocolate cookies.",
      price: 250,
      image: "/products/cookies.jpg",
      stock: 60,
      featured: true,
      categoryId: snacks.id,
    },
    {
      name: "Salted Peanuts",
      slug: "salted-peanuts",
      description: "Roasted salted peanuts.",
      price: 180,
      image: "/products/peanuts.jpg",
      stock: 70,
      featured: false,
      categoryId: snacks.id,
    },
    {
      name: "Popcorn",
      slug: "popcorn",
      description: "Butter flavored popcorn.",
      price: 160,
      image: "/products/popcorn.jpg",
      stock: 80,
      featured: false,
      categoryId: snacks.id,
    },
  ],
});










  console.log("✅ Database seeded successfully!");
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });