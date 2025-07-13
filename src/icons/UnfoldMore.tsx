import type { IconProps } from './IconProps';

export const UnfoldMore = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={props.size || props.height || 20}
    viewBox='0 -960 960 960'
    width={props.size || props.width || 20}
    fill={props.fill || '#64748b'}
    strokeWidth={props.strokeWidth || 2}
    role={props.role ?? 'presentation'}
    {...props}
  >
    <path d='M480-120 300-300l58-58 122 122 122-122 58 58-180 180ZM358-598l-58-58 180-180 180 180-58 58-122-122-122 122Z' />
  </svg>
);
