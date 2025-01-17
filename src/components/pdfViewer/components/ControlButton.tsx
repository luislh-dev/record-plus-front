import { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export const ControlButton: React.FC<ButtonProps> = ({ children, className = '', ...props }) => {
  return (
    <button
      className={`p-1 bg-inherit rounded-md hover:enabled:bg-gray-300 ${className}`}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
};
