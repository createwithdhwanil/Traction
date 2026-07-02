import { Plus } from "lucide-react";

export default function FloatingAddButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="
        lg:hidden
        fixed
        bottom-20
        right-5
        h-14
        w-14
        rounded-full
        bg-indigo-600
        hover:bg-indigo-700
        text-white
        shadow-xl
        flex
        items-center
        justify-center
        z-50
        transition
      "
    >
      <Plus size={28} />
    </button>
  );
}
