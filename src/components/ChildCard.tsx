import type { Child } from "../types/Child"
import type { WardrobeTargetResult } from "../types/Wardrobe"
import "./ChildCard.css"
import { useRef, useState } from "react"
import { categoryLabels } from "../data/categoryLabels"
import {
  Shirt,
  Layers,
  CloudRain,
  Footprints,
  Moon,
  Waves,
  Package,
} from "lucide-react"
import { RaincoatIcon } from "./RaincoatIcon"
import { UnderwearIcon } from "./UnderwearIcon" 
import { PantsIcon } from "./PantsIcon"
import { ChildAvatar } from "./ChildAvatar"
import { Pencil } from "lucide-react"

type ChildCardProps = {
  child: Child
  needs: WardrobeTargetResult[]
  onRecheck: (heightCm: number, shoeSizeEu: number) => void
}

const categoryIcons = {
  top: Shirt,
  bottom: PantsIcon,
  coat: RaincoatIcon,
  shoes: Footprints,
  underwear: UnderwearIcon,
  swimwear: Waves,
  sleepwear: Moon,
  dress: Shirt,
}

export function ChildCard({ child, needs, onRecheck }: ChildCardProps) {
    const totalMissing = needs.reduce(
        (total, result) => total + result.missingQuantity,
        0
    )

    const missingNeeds = needs.filter(
        (result) => result.missingQuantity > 0
    )

    const categoryDetailsRef = useRef<HTMLDivElement>(null)

    function setAllCategoriesOpen(open: boolean) {
    const details = categoryDetailsRef.current?.querySelectorAll("details")

        details?.forEach((detail) => {
            detail.open = open
        })
    }

    const [isEditing, setIsEditing] = useState(false)

    const [heightCm, setHeightCm] = useState(child.heightCm)
    const [shoeSizeEu, setShoeSizeEu] = useState(child.shoeSizeEu)

    const animal = child.id === 1 ? "rabbit" : "bear"

    return (
        <article className="child-card">
        <div className="child-heading">
        <ChildAvatar animal={animal} size={56} />

        <div className="child-heading-info">
            <h3>{child.firstName}</h3>
            <p className="child-age">
            {new Date().getFullYear() -
                new Date(child.birthDate).getFullYear()} ans
            </p>
            <p className="child-heading-measurements">
               {heightCm} cm · Pointure {shoeSizeEu}
            </p>
        </div>
            <button
                type="button"
                className="child-settings-button"
                aria-label={`Modifier les informations de ${child.firstName}`}
                title="Paramètres de l'enfant"
                onClick={() => setIsEditing(true)}
                >
                <Pencil size={14} strokeWidth={2} />
            </button>
        </div>
        <div className="child-wardrobe-summary">
            <strong>
                {totalMissing === 0
                ? "Vestiaire complet"
                : `${totalMissing} vêtements à prévoir`}
            </strong>

            <button
                type="button"
                className="recheck-button"
                onClick={() => {
                if (
                    !Number.isFinite(heightCm) ||
                    !Number.isFinite(shoeSizeEu) ||
                    heightCm < 50 ||
                    heightCm > 220 ||
                    shoeSizeEu < 18 ||
                    shoeSizeEu > 50
                ) {
                    return
                }

                onRecheck(heightCm, shoeSizeEu)
                setIsEditing(false)
                }}
            >
                Revérifier
            </button>
        </div>
        {missingNeeds.length > 0 && (
        <>
            <div className="category-actions">
                <button
                    type="button"
                    onClick={() => setAllCategoriesOpen(true)}
                >
                    Tout déplier
                </button>

                <button
                    type="button"
                    onClick={() => setAllCategoriesOpen(false)}
                >
                    Tout replier
                </button>
                </div>
        </>
        )}
        <div className="wardrobe-categories" ref={categoryDetailsRef}>
            {Array.from(
            new Set(missingNeeds.map((result) => result.target.category))
            ).map((category) => {
            const CategoryIcon =
                categoryIcons[category as keyof typeof categoryIcons] ?? Package
            const categoryNeeds = missingNeeds.filter(
                (result) => result.target.category === category
            )

            const categoryMissing = categoryNeeds.reduce(
                (total, result) => total + result.missingQuantity,
                0
            )

            return (
                <details className="wardrobe-category" key={category}>
                <summary>
                    <span className="category-name">
                        <CategoryIcon
                            size={20}
                            strokeWidth={1.7}
                            aria-hidden="true"
                        />

                        {categoryLabels[category] ?? category}
                    </span>
                    <span className="category-count">
                    {categoryMissing} à prévoir
                    </span>
                </summary>

                <ul>
                    {categoryNeeds.map((result) => (
                    <li key={result.target.id}>
                        <span>
                        {result.target.type}
                        {result.target.features.length > 0
                            ? ` (${result.target.features.join(", ")})`
                            : ""}
                        </span>
                        <strong>
                        {result.missingQuantity} / {result.requiredQuantity}
                        </strong>
                    </li>
                    ))}
                </ul>
                </details>
            )
            })}
        </div>
        {isEditing && (
        <div className="child-edit-overlay">
            <div className="child-edit-modal">
            <div className="child-edit-header">
                <h3>Modifier les informations de {child.firstName}</h3>
                <button
                type="button"
                onClick={() => setIsEditing(false)}
                aria-label="Fermer"
                >
                ✕
                </button>
            </div>
            <div className="child-edit-fields">
            <label>
                Taille (cm)
                <input
                type="number"
                value={heightCm}
                onChange={(e) => setHeightCm(Number(e.target.value))}
                />
            </label>

            <label>
                Pointure (EU)
                <input
                type="number"
                value={shoeSizeEu}
                onChange={(e) => setShoeSizeEu(Number(e.target.value))}
                />
            </label>
            </div>
            <button
                type="button"
                className="child-edit-save"
                onClick={() => {
                    onRecheck(heightCm, shoeSizeEu)
                    setIsEditing(false)
                }}
                >
                Enregistrer
            </button>
            </div>
        </div>
        )}
        </article>
    )
}

