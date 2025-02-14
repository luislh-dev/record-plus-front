import type { iconProps } from './iconProps';

export const Minus = (props: iconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || props.height || '24'}
    height={props.size || props.height || '24'}
    viewBox='0 0 24 24'
    fill={props.fill || 'none'}
    stroke={props.stroke || 'currentColor'}
    strokeWidth='2'
    role='presentation'
    strokeLinecap='round'
    strokeLinejoin='round'
    {...props}
  >
    <path d='M5 12h14' />
  </svg>
);
