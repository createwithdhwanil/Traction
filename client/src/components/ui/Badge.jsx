function Badge({ children, color = "indigo" }) {
  const colors = {
    indigo: "bg-indigo-100 text-indigo-700",

    green: "bg-green-100 text-green-700",

    orange: "bg-orange-100 text-orange-700",

    red: "bg-red-100 text-red-700",

    blue: "bg-blue-100 text-blue-700",
  };

  return (
    <span
      className={`
        inline-flex
        items-center
        px-3
        py-1
        rounded-full
        text-xs
        font-semibold
        ${colors[color]}
      `}
    >
      {children}
    </span>
  );
}

export default Badge;
