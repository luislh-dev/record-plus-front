interface TableCellProps {
  children: React.ReactNode;
  isHeader?: boolean;
}

export function TableCell({ children, isHeader = false }: TableCellProps) {
  if (isHeader) {
    return (
      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        {children}
      </th>
    );
  }
  return (
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
      {children}
    </td>
  );
}
