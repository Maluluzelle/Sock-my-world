import type { SVGProps } from "react"

export function RaincoatIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M7.5 7.5C7 5 8.5 2.5 12 2.5S17 5 16.5 7.5" />
      <path d="M8.5 7.5C8.5 5.5 10 4.5 12 4.5S15.5 5.5 15.5 7.5" />
      <path d="M7.5 7.5 4.5 9 2 16l3 1.2 2.5-4V21h9v-7.8l2.5 4L22 16l-2.5-7-3-1.5" />
      <path d="M12 8v13" />
    </svg>
  )
}