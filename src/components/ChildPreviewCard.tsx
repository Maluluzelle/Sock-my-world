import type { Child } from "../types/Child"
import { ChevronRight } from "lucide-react"
import { ChildAvatar } from "./ChildAvatar"
import "./ChildPreviewCard.css"
import { formatChildAge } from "../utils/formatChildAge"


type ChildPreviewCardProps = {
  child: Child
  onClick: () => void
}

export function ChildPreviewCard({
  child,
  onClick,
}: ChildPreviewCardProps) {
  const animal = child.id === 1 ? "rabbit" : "bear"
  const age = formatChildAge(child.birthDate)

  return (
    <button
      type="button"
      className={`child-preview-card child-preview-${animal}`}
      onClick={onClick}
    >
      <ChildAvatar animal={animal} size={52} />

      <div className="child-preview-info">
        <strong>{child.firstName}</strong>
        <span>{age} </span>
        <span>
          {child.heightCm} cm · Pointure {child.shoeSizeEu}
        </span>
      </div>

      <ChevronRight size={20} aria-hidden="true" />
    </button>
  )
}