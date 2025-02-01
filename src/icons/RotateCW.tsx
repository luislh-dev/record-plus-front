import { iconProps } from './iconProps';

export const RotateCW = (props: iconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={props.size || props.height || '24'}
    height={props.size || props.height || '24'}
    viewBox="0 0 24 24"
    fill={props.fill || 'none'}
    stroke={props.stroke || 'currentColor'}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
  </svg>
);
