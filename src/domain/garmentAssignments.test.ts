import { describe, expect, it } from "vitest"

import type { GarmentAssignment } from "../types/GarmentAssignment"

import {
  getCurrentAssignment,
  assignGarmentToChild,
  unassignGarment,
  transferGarment,
  getGarmentsForChild
} from "./garmentAssignments"

import type { Garment } from "../types/Garment"
import { GarmentStatus, Season } from "../types/Garment"


const assignments: GarmentAssignment[] = [
  {
    id: "assignment-1",
    garmentId: 1,
    childId: 1,
    startDate: "2025-09-01"
  }
]

describe("Gestion des affectations", () => {
  it("retrouve l'enfant actuellement affecté", () => {
    const result = getCurrentAssignment(1, assignments)

    expect(result?.childId).toBe(1)
  })

  it("reconnaît un vêtement du stock familial", () => {
    const result = getCurrentAssignment(2, assignments)

    expect(result).toBeUndefined()
  })

  it("attribue un vêtement non affecté", () => {
    const result = assignGarmentToChild(
      2,
      2,
      assignments,
      "2026-10-10",
      "assignment-2"
    )

    expect(
      getCurrentAssignment(2, result)?.childId
    ).toBe(2)
  })

  it("refuse une deuxième affectation active", () => {
    expect(() =>
      assignGarmentToChild(
        1,
        2,
        assignments,
        "2026-10-10",
        "assignment-2"
      )
    ).toThrow()
  })

  it("remet un vêtement dans le stock familial", () => {
    const result = unassignGarment(
      1,
      assignments,
      "2026-10-10"
    )

    expect(
      getCurrentAssignment(1, result)
    ).toBeUndefined()

    expect(result[0]?.endDate).toBe("2026-10-10")
  })

  it("transfère un vêtement en conservant son historique", () => {
    const result = transferGarment(
      1,
      2,
      assignments,
      "2026-10-10",
      "assignment-2"
    )

    expect(result).toHaveLength(2)
    expect(result[0]?.childId).toBe(1)
    expect(result[0]?.endDate).toBe("2026-10-10")

    expect(
      getCurrentAssignment(1, result)?.childId
    ).toBe(2)
  })

  it("ne modifie pas le tableau d'origine", () => {
    transferGarment(
      1,
      2,
      assignments,
      "2026-10-10",
      "assignment-2"
    )

    expect(assignments[0]?.endDate).toBeUndefined()
    expect(assignments).toHaveLength(1)
  })
describe("getGarmentsForChild", () => {
  const pants: Garment = {
    id: 1,
    householdId: "household-1",
    category: "bottom",
    type: "pants",
    size: "104",
    brand: "Petit Bateau",
    color: "bleu",
    seasons: [Season.AUTUMN],
    features: [],
    status: GarmentStatus.IN_CLOSET,
  }

  const garments: Garment[] = [
    pants,
    { ...pants, id: 2 },
    { ...pants, id: 3 },
  ]

  it("retourne uniquement les vêtements attribués à un enfant", () => {
    const assignments = [
      {
        id: "assignment-1",
        garmentId: 1,
        childId: 1,
        startDate: "2026-01-01",
      },
      {
        id: "assignment-2",
        garmentId: 2,
        childId: 2,
        startDate: "2026-01-01",
      },
    ]

    const result = getGarmentsForChild(
      1,
      garments,
      assignments
    )

    expect(result.map((garment) => garment.id)).toEqual([1])
  })

  it("exclut les vêtements du stock familial", () => {
    const result = getGarmentsForChild(
      1,
      garments,
      []
    )

    expect(result).toEqual([])
  })

  it("prend en compte un transfert entre enfants", () => {
    const assignments = [
      {
        id: "assignment-1",
        garmentId: 1,
        childId: 1,
        startDate: "2026-01-01",
        endDate: "2026-06-01",
      },
      {
        id: "assignment-2",
        garmentId: 1,
        childId: 2,
        startDate: "2026-06-01",
      },
    ]

    const aliceGarments = getGarmentsForChild(
      1,
      garments,
      assignments
    )

    const hugoGarments = getGarmentsForChild(
      2,
      garments,
      assignments
    )

    expect(aliceGarments).toEqual([])
    expect(hugoGarments.map((garment) => garment.id)).toEqual([1])
  })
})
})