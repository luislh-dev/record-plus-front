import type { IconProps } from './IconProps';

export const Close = (props: IconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    height={props.size || props.height || '24px'}
    viewBox='0 -960 960 960'
    width={props.size || props.width || '24px'}
    fill={props.fill || '#e8eaed'}
    stroke='currentColor'
    role={props.role ?? 'presentation'}
    {...props}
  >
    <path d='m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z' />
  </svg>
);
