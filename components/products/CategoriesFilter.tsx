const categories = [
  "All",
  "Fruits",
  "Vegetables",
  "Dairy",
  "Bakery",
];

export default function CategoryFilter() {
  return (
    <div className="flex gap-3 flex-wrap mb-8">

      {categories.map((category) => (
        <button
          key={category}
          className="px-4 py-2 rounded-full bg-green-100 text-green-700 hover:bg-green-600 hover:text-white"
        >
          {category}
        </button>
      ))}

    </div>
  );
}