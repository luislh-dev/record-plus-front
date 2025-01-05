interface FilePickerProps {
  onChange?: (file: File | null) => void;
  className?: string;
  label?: string;
  id?: string;
  required?: boolean;
}

export const FilePicker = ({
  onChange,
  className,
  label,
  id = `file-input-${Math.random().toString(36).substring(7)}`,
  required = false
}: FilePickerProps) => {
  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label htmlFor={id} className="text-sm font-medium text-gray-900 dark:text-gray-200">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}

      <input
        id={id}
        required={required}
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
    </div>
  );
};
