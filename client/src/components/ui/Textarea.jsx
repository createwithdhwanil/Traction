function Textarea({ ...props }) {
  return (
    <textarea
      {...props}
      className="
        w-full
        rounded-2xl
        border
        border-slate-200
        dark:border-slate-700
        bg-slate-50
        dark:bg-slate-800
        px-5
        py-4
        outline-none
        focus:ring-2
        focus:ring-indigo-500
      "
    />
  );
}

export default Textarea;
