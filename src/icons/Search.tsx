import type { iconProps } from './iconProps';

export function Search(props: iconProps) {
  return (
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
      <circle cx='11' cy='11' r='8' />
      <path d='m21 21-4.3-4.3' />
    </svg>
  );
}
