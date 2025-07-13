import type { IconProps } from './IconProps';

export const ChevronRight = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={props.size || props.height || '24px'}
    viewBox='0 -960 960 960'
    width={props.size || props.width || '24px'}
    fill={props.fill || '#e8eaed'}
    stroke='currentColor'
    role='presentation'
    {...props}
  >
    <path d='M504-480 320-664l56-56 240 240-240 240-56-56 184-184Z' />
  </svg>
);
