import type { iconProps } from './iconProps';

export const Hospital = (props: iconProps) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width={props.size || props.width || 24}
    height={props.size || props.height || 24}
    viewBox='0 0 24 24'
    fill={'none'}
    stroke={props.color || '#e8eaed'}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    role='presentation'
    {...props}
  >
    <path d='M12 6v4' />
    <path d='M14 14h-4' />
    <path d='M14 18h-4' />
    <path d='M14 8h-4' />
    <path d='M18 12h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2' />
    <path d='M18 22V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v18' />
  </svg>
);
