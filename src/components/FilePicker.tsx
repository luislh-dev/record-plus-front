interface FilePickerProps {
  onChange?: (file: File | null) => void;
  className?: string;
}

export const FilePicker = ({ onChange, className }: FilePickerProps) => {
  return (
    <input
      className={`block w-full text-sm text-gray-500 border border-gray-300 rounded-lg
      file:me-4 file:py-2 file:px-4
      file:rounded-lg file:border-0
      file:text-sm file:font-semibold
      file:bg-blue-600 file:text-white
      hover:file:bg-blue-700
      file:disabled:opacity-50 file:disabled:pointer-events-none
      dark:text-neutral-500
      dark:file:bg-blue-500
      dark:hover:file:bg-blue-400
      ${className}`}
      type="file"
      onChange={e => {
        const file = e.target.files?.[0] || null;
        onChange?.(file);
      }}
    />
  );
};
