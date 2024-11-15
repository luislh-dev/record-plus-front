interface TableProps {
  children: React.ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <table className="min-w-full border-collapse border border-gray-200">
      {children}
    </table>
  );
}
