import type { IconProps } from './IconProps';

export const Minus = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || props.height || '24'}
    height={props.size || props.height || '24'}
    viewBox='0 0 24 24'
    fill={props.fill || 'none'}
    stroke={props.stroke || 'currentColor'}
    strokeWidth='2'
    role={props.role ?? 'presentation'}
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M5 12h14' />
  </svg>
);
