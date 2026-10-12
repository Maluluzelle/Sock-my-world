import { useState, useEffect } from "react"

import { ChildCard } from "./components/ChildCard"
import type { Child } from "./types/Child"
import type { Garment } from "./types/Garment"
import type { GarmentAssignment } from "./types/GarmentAssignment"
import { Season } from "./types/Garment"
import { wardrobeSuggestions } from "./data/wardrobeSuggestions"
import { calculateAssignedChildWardrobeNeeds } from "./domain/wardrobe"
import { ChildPreviewCard } from "./components/ChildPreviewCard"
import logo from "./assets/logo.png"
import { categoryLabels } from "./data/categoryLabels"

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

const garments: Garment[] = []
const assignments: GarmentAssignment[] = []

const seasonLabels: Record<Season, string> = {
        [Season.SPRING]: "Printemps",
        [Season.SUMMER]: "Été",
        [Season.AUTUMN]: "Automne",
        [Season.WINTER]: "Hiver",
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
        {selectedChildId === null ? (
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
                      <h2 className="category-page-title">
                        {categoryLabels[selectedCategory] ?? selectedCategory}
                      </h2>
                      <p className="category-summary">
                        {categoryTotalMissing} vêtement{categoryTotalMissing > 1 ? "s" : ""} à prévoir                      </p>
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
                            <li key={index} className="category-garment-card">
                              <span className="category-garment-name">
                                {result.target.garmentType}
                              </span>

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
    </main>
  )
}

export default App