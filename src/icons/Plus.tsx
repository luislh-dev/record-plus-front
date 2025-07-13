import type { IconProps } from './IconProps';

export const Plus = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || props.height || '24'}
    height={props.size || props.height || '24'}
    viewBox='0 0 24 24'
    fill={props.fill || 'none'}
    stroke={props.stroke || 'currentColor'}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    role='presentation'
    {...props}
  >
    <path d='M5 12h14' />
    <path d='M12 5v14' />
  </svg>
);
