import { iconProps } from './iconProps';

export function FilterList(props: iconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height={props.size || props.height || 20}
      viewBox="0 -960 960 960"
      width={props.size || props.width || 20}
      fill={props.fill || '#64748b'}
      strokeWidth={props.strokeWidth || 2}
      {...props}
    >
      <path d="M400-240v-80h160v80H400ZM240-440v-80h480v80H240ZM120-640v-80h720v80H120Z" />
    </svg>
  );
}
