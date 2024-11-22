import { iconProps } from "./iconProps";

export const ArrowDown = (props: iconProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    height={props.size || props.height || 20}
    viewBox="0 -960 960 960"
    width={props.size || props.width || 20}
    fill={props.fill || "#64748b"}
    strokeWidth={props.strokeWidth || 2}
    {...props}
  >
    <path d="M480-344 240-584l56-56 184 184 184-184 56 56-240 240Z" />
  </svg>
);
