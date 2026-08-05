"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();

    if (!query.trim()) return;

    router.push(`/products?search=${encodeURIComponent(query.trim())}`);
  }

  return (
    <form
      onSubmit={handleSearch}
      className="flex w-full max-w-lg items-center"
    >
      <div className="relative w-full">
        <Search
          size={18}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search fresh fruits, vegetables..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="h-12 w-full rounded-l-full border-2 border-green-500 bg-white pl-11 pr-4 text-gray-700 outline-none transition-all placeholder:text-gray-400 focus:border-green-600 focus:ring-2 focus:ring-green-200"
        />
      </div>

      <button
        type="submit"
        className="h-12 rounded-r-full border-2 border-l-0 border-green-500 bg-green-600 px-6 text-white transition hover:bg-green-700"
      >
        <Search size={20} />
      </button>
    </form>
  );
}