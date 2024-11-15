interface TableColumnProps {
  children: React.ReactNode;
  width?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function TableColumn({
  children,
  width = "auto",
  align = "left",
  className = "",
}: TableColumnProps) {
  const alignmentClasses = {
    left: "text-left",
    center: "text-center",
    right: "text-right",
  };

  return (
    <td
      className={`px-6 py-4 ${alignmentClasses[align]} ${className}`}
      style={{ width }}
    >
      {children}
    </td>
  );
}
