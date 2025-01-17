import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ControlButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`p-1 hover:bg-gray-300 rounded-md disabled:text-gray-400 disabled:hover:bg-inherit ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
