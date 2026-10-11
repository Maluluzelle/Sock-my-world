import type { SVGProps } from "react"

export function UnderwearIcon(props: SVGProps<SVGSVGElement>) {
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
      <path d="M3 6 Q12 8 21 6 L19 13 Q16 14 15 20 H9 Q8 14 5 13 Z" />
      <path d="M3 6 V4 Q12 6 21 4 V6" />
    </svg>
  )
}