import { useState } from "react"

import { ChildCard } from "./components/ChildCard"
import type { Child } from "./types/Child"
import type { Garment } from "./types/Garment"
import type { GarmentAssignment } from "./types/GarmentAssignment"
import { Season } from "./types/Garment"
import { wardrobeSuggestions } from "./data/wardrobeSuggestions"
import { calculateAssignedChildWardrobeNeeds } from "./domain/wardrobe"
import { ChildPreviewCard } from "./components/ChildPreviewCard"


const initialChildren: Child[] = [
  {
    id: 1,
    householdId: "household-1",
    firstName: "Alice",
    birthDate: "2022-05-10",
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
  const [selectedSeason, setSelectedSeason] = useState<Season>(
    Season.AUTUMN
  )

  const seasonalTargets = wardrobeSuggestions.filter(
    (target) => target.season === selectedSeason
  )

  const [children, setChildren] = useState<Child[]>(initialChildren)

  const [selectedChildId, setSelectedChildId] = useState<number | null>(null)

  function updateChildMeasurements(
    childId: number,
    heightCm: number,
    shoeSizeEu: number
  ) {
    setChildren((currentChildren) =>
      currentChildren.map((child) =>
        child.id === childId
          ? { ...child, heightCm, shoeSizeEu }
          : child
      )
    )
  }
  return (
    <main>
      <h1 className="app-title">Sock my World</h1>
      <p>Le vestiaire des enfants, une responsabilité partagée.</p>
      <div>
        <label htmlFor="season">Saison : </label>

        <select
          className="season-select"
            id="season"
            value={selectedSeason}
            onChange={(event) =>
              setSelectedSeason(event.target.value as Season)
            }
        >
          {Object.values(Season).map((season) => (
            <option key={season} value={season}>
              {seasonLabels[season]}
            </option>
          ))}
        </select>
      </div>
      <h2>Mes enfants</h2>

      <div className="children-grid">
        {selectedChildId === null ? (
        children.map((child) => (
          <ChildPreviewCard
            key={child.id}
            child={child}
            onClick={() => setSelectedChildId(child.id)}
          />
        ))
      ) : (
        <>
          <button
            type="button"
            className="back-button"
            onClick={() => setSelectedChildId(null)}
          >
            ← Retour à Mes enfants
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
                  onRecheck={(heightCm, shoeSizeEu) =>
                    updateChildMeasurements(
                      child.id,
                      heightCm,
                      shoeSizeEu
                    )
                  }
                />
              )
            })}
        </>
      )}
      </div>
    </main>
  )
}

export default App