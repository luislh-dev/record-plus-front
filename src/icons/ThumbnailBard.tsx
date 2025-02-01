import type { iconProps } from './iconProps';

export const ThumbnailBard = (props: iconProps) => (
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
    <path d='M2 7v10' />
    <path d='M6 5v14' />
    <rect width='12' height='18' x='10' y='3' rx='2' />
  </svg>
);
