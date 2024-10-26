import * as React from "react";

interface Props {
  height: string;
  width: string;
  className?: string;
}

const LinkedinIcon = ({ height, width, className }: Props) => (
  <svg
    viewBox="0 0 192 192"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
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
      <rect
        width={132}
        height={132}
        x={30}
        y={30}
        stroke="#000000"
        strokeWidth={12}
        rx={16}
      />
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={12}
        d="M66 86v44"
      />
      <circle cx={66} cy={64} r={8} fill="#000000" />
      <path
        stroke="#000000"
        strokeLinecap="round"
        strokeWidth={12}
        d="M126 130v-26c0-9.941-8.059-18-18-18v0c-9.941 0-18 8.059-18 18v26"
      />
    </g>
  </svg>
);
export default LinkedinIcon;
