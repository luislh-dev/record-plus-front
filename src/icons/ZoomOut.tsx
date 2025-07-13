import type { IconProps } from './IconProps';

export const ZoomOut = (props: IconProps) => (
  <svg
    height={props.size || props.height || '24'}
    width={props.size || props.height || '24'}
    viewBox='0 0 24 24'
    fill={props.fill || 'none'}
    stroke={props.stroke || 'currentColor'}
    strokeWidth='2'
    strokeLinecap='round'
    strokeLinejoin='round'
    role={props.role ?? 'presentation'}
    {...props}
  >
    <circle cx='11' cy='11' r='8' />
    <line x1='21' x2='16.65' y1='21' y2='16.65' />
    <line x1='8' x2='14' y1='11' y2='11' />
  </svg>
);
