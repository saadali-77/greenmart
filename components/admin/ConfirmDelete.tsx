"use client";

interface ConfirmDeleteProps {
  onDelete: () => void;
}

export default function ConfirmDelete({
  onDelete,
}: ConfirmDeleteProps) {
  return (
    <button
      onClick={onDelete}
      className="btn btn-error btn-sm"
    >
      Delete
    </button>
  );
}