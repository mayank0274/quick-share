import * as React from "react";

interface Props {
  height: string;
  width: string;
  className?: string;
}

const EmailIcon = ({ height, width, className }: Props) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    className={className}
  >
    <g id="SVGRepo_bgCarrier" strokeWidth={0} />
    <g
      id="SVGRepo_tracerCarrier"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <g id="SVGRepo_iconCarrier">
      <path
        d="M4 7.00005L10.2 11.65C11.2667 12.45 12.7333 12.45 13.8 11.65L20 7"
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <rect
        x={3}
        y={5}
        width={18}
        height={14}
        rx={2}
        stroke="#000000"
        strokeWidth={2}
        strokeLinecap="round"
      />
    </g>
  </svg>
);
export default EmailIcon;
