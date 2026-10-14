import { useState, useEffect } from "react"

import { ChildCard } from "./components/ChildCard"
import type { Child } from "./types/Child"
import type { Garment } from "./types/Garment"
import type { GarmentAssignment } from "./types/GarmentAssignment"
import { Season, GarmentFeature, GarmentStatus } from "./types/Garment"
import { wardrobeSuggestions } from "./data/wardrobeSuggestions"
import { calculateAssignedChildWardrobeNeeds } from "./domain/wardrobe"
import { ChildPreviewCard } from "./components/ChildPreviewCard"
import logo from "./assets/logo.png"
import { categoryLabels } from "./data/categoryLabels"
import { garmentTypeLabels, garmentFeatureLabels } from "./data/garmentLabels"
import { Shirt, Footprints, Waves, Moon, Package } from "lucide-react"
import { PantsIcon } from "./components/PantsIcon"
import { RaincoatIcon } from "./components/RaincoatIcon"
import { UnderwearIcon } from "./components/UnderwearIcon"
import { AddGarmentModal } from "./components/AddGarmentModal"
import { GarmentDetail } from "./components/GarmentDetail"
import { GarmentTypeList } from "./components/GarmentTypeList"

const garmentImages = import.meta.glob(
  "./assets/garments/*.png",
  {
    eager: true,
    query: "?url",
    import: "default",
  }
) as Record<string, string>

const initialChildren: Child[] = [
  {
    id: 1,
    householdId: "household-1",
    firstName: "Alice",
    birthDate: "2024-05-10",
    heightCm: 102,
    weightKg: 16,
    shoeSizeEu: 27,
  },
  {
    id: 2,
    householdId: "household-1",
    firstName: "Hugo",
    birthDate: "2020-03-15",
    heightCm: 118,
    weightKg: 21,
    shoeSizeEu: 30,
  },
]

const garments: Garment[] = [
  {
    id: 1,
    householdId: "household-1",
    category: "bottom",
    type: "pants",
    size: "90",
    brand: "Jacadi",
    color: "Bleu",
    seasons: [
      Season.SPRING,
      Season.SUMMER,
      Season.AUTUMN,
      Season.WINTER,
    ],
    features: [],
    status: GarmentStatus.IN_CLOSET,
    photo: garmentImages["./assets/garments/pants.png"],
  },
]

const assignments: GarmentAssignment[] = []

const seasonLabels: Record<Season, string> = {
        [Season.SPRING]: "Printemps",
        [Season.SUMMER]: "Été",
        [Season.AUTUMN]: "Automne",
        [Season.WINTER]: "Hiver",
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

function App() {
  const [selectedSeason, setSelectedSeason] = useState<Season>(() => {
    const month = new Date().getMonth() + 1

    if (month >= 3 && month <= 5) {
      return Season.SPRING
    }

    if (month >= 6 && month <= 8) {
      return Season.SUMMER
    }

    if (month >= 9 && month <= 11) {
      return Season.AUTUMN
    }

    return Season.WINTER
  })

  const seasonalTargets = wardrobeSuggestions.filter(
    (target) => target.season === selectedSeason
  )

  const [children, setChildren] = useState<Child[]>(() => {
  const savedChildren = localStorage.getItem("pioupiousape-children")

    if (savedChildren) {
      try {
        return JSON.parse(savedChildren) as Child[]
      } catch {
        return initialChildren
      }
    }

    return initialChildren
  })

  useEffect(() => {
    localStorage.setItem(
      "pioupiousape-children",
      JSON.stringify(children)
    )
  }, [children])

  const [selectedChildId, setSelectedChildId] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [isAddingChild, setIsAddingChild] = useState(false)
  const [isAddingGarment, setIsAddingGarment] = useState(false)
  const [selectedGarmentId, setSelectedGarmentId] = useState<number | null>(null)
  const [selectedGarmentType, setSelectedGarmentType] = useState<string | null>(null)

  function updateChildMeasurements(
    childId: number,
    heightCm: number,
    shoeSizeEu: number,
    firstName: string,
    birthDate: string
  ) {
    setChildren((currentChildren) =>
      currentChildren.map((child) =>
        child.id === childId
          ? {
              ...child,
              heightCm,
              shoeSizeEu,
              firstName,
              birthDate,
            }
          : child
      )
    )
  }
  return (
    <main>
      {selectedGarmentId !== null && (
        <div className="garment-detail-page">
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedGarmentId(null)}
          >
            ← Retour
          </button>

          {garments
            .filter((garment) => garment.id === selectedGarmentId)
            .map((garment) => (
              <GarmentDetail
                key={garment.id}
                garment={garment}
                onEdit={() => {}}
                onDelete={() => {}}
                onTransfer={() => {}}
              />
            ))}
        </div>
      )}

      {selectedGarmentId === null && (
        <>
      <button
        type="button"
        className="settings-button"
        aria-label="Paramètres"
        title="Paramètres"
        onClick={() => alert("La page Paramètres arrive bientôt !")}
      >
        ⚙
      </button>
      <div className="app-brand">
        <img
          src={logo}
          alt=""
          className="app-logo"
        />
        <h1 className="app-title"> PiouPiou<span>Sape</span></h1>
      </div>
      <p className="app-subtitle">
        Le vestiaire des enfants, une responsabilité partagée.
      </p>
      {selectedChildId === null && (
        <div className="children-heading">
          <h2 className="children-title">Mes enfants</h2>
          <button
            type="button"
            className="add-child-button"
            onClick={() => setIsAddingChild(true)}
          >
            + Ajouter un enfant
          </button>
      </div>
      )}
      <div className="children-grid">
        {selectedGarmentType !== null ? (
        <div className="child-detail-layout">
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedGarmentType(null)}
          >
            ← Retour
          </button>

          <GarmentTypeList
            type={selectedGarmentType}
            garments={garments}
            onSelectGarment={setSelectedGarmentId}
          />
        </div>
        ) : selectedChildId === null ? (
        children.map((child) => (
          <ChildPreviewCard
            key={child.id}
            child={child}
            onClick={() => setSelectedChildId(child.id)}
          />
        ))
            ) : selectedCategory !== null ? (
            <div className="child-detail-layout">
              {children
                .filter((child) => child.id === selectedChildId)
                .map((child) => {
                  const needs = calculateAssignedChildWardrobeNeeds(
                    child,
                    garments,
                    assignments,
                    wardrobeSuggestions.filter(
                      (target) => target.season === selectedSeason
                    )
                  )
                  const categoryTotalMissing = needs
                    .filter(
                      (result) =>
                        result.target.category === selectedCategory &&
                        result.missingQuantity > 0
                    )
                    .reduce(
                      (total, result) => total + result.missingQuantity,
                      0
                    )
                  const categoryTotalNeeded = needs
                    .filter(
                      (result) => result.target.category === selectedCategory
                    )
                    .reduce(
                      (total, result) => total + result.requiredQuantity,
                      0
                    )
                  return (
                    <div key={child.id}>
                      <button
                        type="button"
                        className="back-button"
                        onClick={() => setSelectedCategory(null)}
                      >
                        ← retour
                      </button>
                      <div className="category-page-header">
                        <div className="category-page-heading">
                          {(() => {
                            const CategoryIcon =
                              categoryIcons[selectedCategory as keyof typeof categoryIcons] ?? Package

                            return (
                              <CategoryIcon
                                size={44}
                                strokeWidth={1.7}
                                aria-hidden="true"
                                className="category-page-icon"
                              />
                            )
                          })()}

                          <div className="category-page-heading-text">
                            <h2 className="category-page-title">
                              {categoryLabels[selectedCategory] ?? selectedCategory}
                            </h2>

                            <p className="category-summary">
                              {categoryTotalMissing} vêtement
                              {categoryTotalMissing > 1 ? "s" : ""} à prévoir
                            </p>
                          </div>
                        </div>

                        <button
                          type="button"
                          className="category-add-button"
                          onClick={() => setIsAddingGarment(true)}
                        >
                          + Ajouter un vêtement
                        </button>
                      </div>
                      <div className="category-progress-row">
                        <div className="category-progress">
                          <div
                            className="category-progress-fill"
                            style={{
                              width: `${
                                categoryTotalNeeded > 0
                                  ? Math.max(
                                      0,
                                      Math.min(
                                        100,
                                        ((categoryTotalNeeded - categoryTotalMissing) /
                                          categoryTotalNeeded) * 100
                                      )
                                    )
                                  : 0
                              }%`,
                            }}
                          />
                        </div>

                        <span className="category-progress-count">
                          {Math.max(0, categoryTotalNeeded - categoryTotalMissing)}/{categoryTotalNeeded}
                        </span>
                      </div>
                      <ul className="category-garments">
                        {needs
                          .filter(
                            (result) => result.target.category === selectedCategory
                          )
                          .map((result, index) => (
                            <li
                              key={index}
                              className="category-garment-card"
                              onClick={() => setSelectedGarmentType(result.target.type)}
                              style={{ cursor: "pointer" }}
                            >
                              {(() => {
                                const imageByType: Record<string, string> = {
                                  pants: "pants.png",
                                  leggings: "leggings.png",
                                  shorts: "short.png",
                                  skirt: "skirt.png",
                                  tshirt: result.target.features.includes(GarmentFeature.LONGSLEEVED)
                                    ? "t_shirt_longsleeved.png"
                                    : "t_shirt_shortsleeved.png",
                                  shirt: "shirt.png",
                                  sweater: "sweater.png",
                                  sweatshirt: "sweatshirt.png",
                                  cardigan: "cardigan.png",
                                  dress: "dress.png",
                                  overall: "overall.png",
                                  raincoat: "raincoat.png",
                                  winterCoat: "wintercoat.png",
                                  jacket: "jacket.png",
                                  sneakers: "sneakers.png",
                                  boots: "boots.png",
                                  sandals: "sandals.png",
                                  underpants: "underpant.png",
                                  socks: "socks.png",
                                  tights: "tights.png",
                                  undershirt: "undershirt.png",
                                  onesie: "body.png",
                                  swimsuit: "swimwear.png",
                                  pyjamas: "pyjama.png",
                                }

                                const otherImages: Record<string, string> = {
                                  top: "top_other.png",
                                  bottom: "bottom_other.png",
                                  coat: "coat_other.png",
                                  shoes: "shoes_other.png",
                                  underwear: "underwear_other.png",
                                  swimwear: "swim_other.png",
                                  sleepwear: "nightwear_other.png",
                                }

                                const filename =
                                  result.target.type === "other"
                                    ? otherImages[result.target.category]
                                    : imageByType[result.target.type] ??
                                      otherImages[result.target.category]
                                const image = filename
                                  ? garmentImages[`./assets/garments/${filename}`]
                                  : undefined

                                return image ? (
                                  <img
                                    src={image}
                                    alt=""
                                    className="category-garment-image"
                                  />
                                ) : null
                              })()}
                              <div className="category-garment-info">
                                <span className="category-garment-name">
                                  {garmentTypeLabels[result.target.type] ?? result.target.type}
                                </span>

                                {result.target.features.length > 0 && (
                                  <div className="category-garment-features">
                                    {result.target.features.map((feature) => (
                                      <span key={feature} className="category-feature-badge">
                                        {garmentFeatureLabels[feature] ?? feature}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>

                              <span
                                className={`category-garment-count ${
                                  result.missingQuantity === 0 ? "complete" : ""
                                }`}
                              >
                                {Math.max(0, result.requiredQuantity - result.missingQuantity)}/{result.requiredQuantity}
                              </span>
                          </li>
                          ))}
                      </ul>
                    </div>
                  )
                                })}
            </div>
          ) : (
              <>
                <div className="child-detail-layout">
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedChildId(null)}
          >
            ← retour
          </button>
          {children
            .filter((child) => child.id === selectedChildId)
            .map((child) => {
              const needs = calculateAssignedChildWardrobeNeeds(
                child,
                garments,
                assignments,
                wardrobeSuggestions.filter(
                  (target) => target.season === selectedSeason
                )
              )
              return (
                <ChildCard
                  key={child.id}
                  child={child}
                  needs={needs}
                  selectedSeason={selectedSeason}
                  onSeasonChange={setSelectedSeason}
                  onCategoryClick={setSelectedCategory}
                  onRecheck={(heightCm, shoeSizeEu, firstName, birthDate) =>
                    updateChildMeasurements(
                      child.id,
                      heightCm,
                      shoeSizeEu,
                      firstName,
                      birthDate
                    )
                  }
                />
              )
            })}
          </div>
        </>
      )}
      </div>
      {isAddingChild && (
        <div className="child-edit-overlay">
          <div className="child-edit-modal">
            <h2>Ajouter un enfant 🐣</h2>

            <p>
              Renseignons les informations de votre enfant
              pour préparer son vestiaire.
            </p>

            <button
              type="button"
              onClick={() => setIsAddingChild(false)}
            >
              Annuler
            </button>
          </div>
        </div>
      )}
      {isAddingGarment && (
        <AddGarmentModal
          onClose={() => setIsAddingGarment(false)}
        />
      )}
      </>
    )}
    </main>
  )
}

export default App