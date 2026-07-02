function Card({ children, className = "", hover = true, padding = "p-6" }) {
  return (
    <div
      className={`
        bg-white
        dark:bg-slate-900
        rounded-3xl
        border
        border-slate-200
        dark:border-slate-800
        shadow-sm
        ${hover ? "hover:shadow-xl hover:-translate-y-1" : ""}
        transition-all
        duration-300
        ${padding}
        ${className}
      `}
    >
      {children}
    </div>
  );
}

export default Card;
