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
import { formatChildAge } from "../utils/formatChildAge"
import { Season } from "../types/Garment"

type ChildCardProps = {
  child: Child
  needs: WardrobeTargetResult[]
  selectedSeason: Season
  onSeasonChange: (season: Season) => void
  onRecheck: (heightCm: number, shoeSizeEu: number, firstName: string, birthDate:string) => void
  onCategoryClick: (category: string) => void
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

export function ChildCard({ 
    child,
    needs,
    selectedSeason,
    onSeasonChange,
    onRecheck,
    onCategoryClick,
 }: ChildCardProps) {

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

    const [firstName, setFirstName] = useState(child.firstName)
    const [birthDate, setBirthDate] = useState(child.birthDate)

    return (
        <article className="child-card">
        <div className="child-heading">
        <ChildAvatar animal={animal} size={56} />

        <div className="child-heading-info">
            <h3>{child.firstName}</h3>
            <p className="child-age">
             {formatChildAge(child.birthDate)}
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
                onClick={() => {
                    setFirstName(child.firstName)
                    setBirthDate(child.birthDate)
                    setHeightCm(child.heightCm)
                    setShoeSizeEu(child.shoeSizeEu)
                    setIsEditing(true)
                }}
                >
                <Pencil size={14} strokeWidth={2} />
            </button>
        </div>
        <div className="season-buttons">
        {[
            { value: Season.AUTUMN, label: "🍂 Automne" },
            { value: Season.WINTER, label: "❄️ Hiver" },
            { value: Season.SPRING, label: "🌷 Printemps" },
            { value: Season.SUMMER, label: "☀️ Été" },
        ].map((season) => (
            <button
            key={season.value}
            type="button"
            className={`season-button ${
                selectedSeason === season.value ? "active" : ""
            }`}
            onClick={() => onSeasonChange(season.value)}
            aria-pressed={selectedSeason === season.value}
            >
            {season.label}
            </button>
        ))}
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
                <button
                    key={category}
                    type="button"
                    className="wardrobe-category category-navigation"
                    onClick={() => onCategoryClick(category)}
                >
                    <span className="category-name">
                    <CategoryIcon
                        size={20}
                        strokeWidth={1.7}
                        aria-hidden="true"
                    />
                    {categoryLabels[category] ?? category}
                    </span>

                    <span className="category-navigation-right">
                    <span className="category-count">
                        {categoryMissing} à prévoir
                    </span>
                    <span className="category-arrow" aria-hidden="true">
                        →
                    </span>
                    </span>
                </button>
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
                    onClick={() => {
                        setHeightCm(child.heightCm)
                        setShoeSizeEu(child.shoeSizeEu)
                        setFirstName(child.firstName)
                        setBirthDate(child.birthDate)
                        setIsEditing(false)
                    }}
                    aria-label="Fermer sans enregistrer"
                    >
                    ✕
                </button>
            </div>
            <div className="child-edit-fields">
                <label>
                    Prénom
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                    />
                </label>
                <label>
                    Date de naissance
                    <input
                        type="date"
                        value={birthDate}
                        onChange={(e) => setBirthDate(e.target.value)}
                    />
                </label>
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
            <div className="child-edit-actions">
            <button
                type="button"
                className="child-edit-cancel"
                onClick={() => {
                    setHeightCm(child.heightCm)
                    setShoeSizeEu(child.shoeSizeEu)
                    setFirstName(child.firstName)
                    setBirthDate(child.birthDate)
                    setIsEditing(false)
                }}
                >
                Annuler
            </button>
            <button
                type="button"
                className="child-edit-save"
                onClick={() => {
                if (!birthDate || !firstName.trim()) {
                    alert("Le prénom et la date de naissance sont obligatoires.")
                    return
                }

                onRecheck(heightCm, shoeSizeEu, firstName.trim(), birthDate)
                setIsEditing(false)
                }}
                >
                Enregistrer
            </button>
            </div>
            </div>
        </div>
        )}
        </article>
    )
}

