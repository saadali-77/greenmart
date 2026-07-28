import { Search } from "lucide-react";

export default function ProductSearch() {
  return (
    <div className="flex items-center border rounded-lg px-4 py-3 mb-8">

      <Search size={20} className="text-gray-500"/>

      <input
        type="text"
        placeholder="Search groceries..."
        className="ml-3 w-full outline-none"
      />

    </div>
  );
}