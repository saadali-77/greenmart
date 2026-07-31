"use client";

interface SearchBarProps {
  placeholder?: string;
}

export default function SearchBar({
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      className="input input-bordered w-full max-w-md"
    />
  );
}