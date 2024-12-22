import { createElement } from 'react';

const variantClasses = {
  // Títulos principales del sistema
  hero: 'text-4xl sm:text-5xl md:text-7xl font-bold uppercase tracking-tight',
  'page-title': 'text-5xl font-bold tracking-tight',
  'section-title': 'text-3xl font-semibold tracking-normal',
  subsection: 'text-2xl font-medium',
  'group-title': 'text-xl font-medium',
  'record-title': 'text-lg font-medium',
  'data-title': 'text-base font-medium',

  // Variantes para contenido
  'body-large': 'text-lg leading-relaxed',
  body: 'text-base leading-relaxed',
  'body-small': 'text-sm leading-relaxed',

  // Variantes especiales
  label: 'text-sm font-medium uppercase tracking-wide',
  metric: 'text-4xl font-bold',
  status: 'text-sm font-semibold uppercase',
  error: 'text-xs'
};

const colorClasses = {
  default: 'text-gray-900',
  secondary: 'text-gray-600',
  muted: 'text-gray-500',
  white: 'text-white',
  primary: 'text-blue-600',
  success: 'text-green-600',
  warning: 'text-yellow-600',
  danger: 'text-danger',
  info: 'text-cyan-600'
};

type TypographyProps = {
  as?: keyof JSX.IntrinsicElements;
  variant: keyof typeof variantClasses;
  color?: keyof typeof colorClasses;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>;

export const Typography = ({
  as: Tag = 'p',
  variant,
  color,
  className = '',
  children,
  ...props
}: TypographyProps) => {
  // Si es error y no se especificó un color, usar danger
  const defaultColor = variant === 'error' ? 'danger' : 'default';
  const finalColor = color || defaultColor;

  const classes = [variantClasses[variant], colorClasses[finalColor], className].join(' ');

  return createElement(
    Tag,
    {
      className: classes,
      tabIndex: 0,
      ...props
    },
    children
  );
};
