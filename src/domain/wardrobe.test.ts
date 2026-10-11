import { describe, expect, it } from "vitest"

import type { Garment } from "../types/Garment"
import { GarmentFeature, GarmentStatus, Season } from "../types/Garment"
import type { WardrobeTarget } from "../types/Wardrobe"
import { matchesWardrobeTarget, getEffectiveQuantity, calculateWardrobeNeeds, isGarmentAvailable, calculateChildWardrobeNeeds, calculateAssignedChildWardrobeNeeds } from "./wardrobe"
import type { Child } from "../types/Child"

const target: WardrobeTarget = {
  id: 45,
  category: "top",
  type: "tshirt",
  features: [GarmentFeature.LONGSLEEVED],
  season: Season.AUTUMN,
  suggestedQuantity: 7
}

type TopGarment = Extract<Garment, { category: "top" }>

const garment: TopGarment = {
  id: 1,
  householdId: "household-1",
  category: "top",
  type: "tshirt",
  size: "104",
  brand: "Petit Bateau",
  color: "bleu",
  seasons: [Season.AUTUMN, Season.WINTER],
  features: [GarmentFeature.LONGSLEEVED],
  status: GarmentStatus.IN_CLOSET
}

describe("Correspondance avec le vestiaire idéal", () => {
  it("accepte un vêtement qui correspond au besoin", () => {
    expect(matchesWardrobeTarget(garment, target)).toBe(true)
  })

  it("accepte un vêtement avec des caractéristiques supplémentaires", () => {
    const warmGarment: Garment = {
      ...garment,
      features: [
        GarmentFeature.LONGSLEEVED,
        GarmentFeature.WARM
      ]
    }

    expect(matchesWardrobeTarget(warmGarment, target)).toBe(true)
  })

  it("refuse un vêtement sans la caractéristique exigée", () => {
    const shortSleevedGarment: Garment = {
      ...garment,
      features: [GarmentFeature.SHORTSLEEVED]
    }

    expect(matchesWardrobeTarget(shortSleevedGarment, target)).toBe(false)
  })

  it("refuse un vêtement qui ne convient pas à la saison", () => {
    const summerGarment: Garment = {
      ...garment,
      seasons: [Season.SUMMER]
    }

    expect(matchesWardrobeTarget(summerGarment, target)).toBe(false)
  })

  it("refuse un vêtement d'un autre type", () => {
    const sweater: Garment = {
        ...garment,
        category: "top",
        type: "sweater"
    }

    expect(matchesWardrobeTarget(sweater, target)).toBe(false)
    })

  it("accepte un besoin sans caractéristique obligatoire", () => {
    const neutralTarget: WardrobeTarget = {
      ...target,
      features: []
    }

    expect(matchesWardrobeTarget(garment, neutralTarget)).toBe(true)
  })

  describe("Quantités du vestiaire idéal", () => {
  it("utilise la quantité suggérée par défaut", () => {
    expect(getEffectiveQuantity(target)).toBe(7)
  })

  it("utilise la quantité personnalisée", () => {
    const customTarget: WardrobeTarget = {
      ...target,
      targetQuantity: 10
    }

    expect(getEffectiveQuantity(customTarget)).toBe(10)
  })

  it("accepte une quantité personnalisée de zéro", () => {
    const customTarget: WardrobeTarget = {
      ...target,
      targetQuantity: 0
    }

    expect(getEffectiveQuantity(customTarget)).toBe(0)
  })
})
  describe("calculateWardrobeNeeds", () => {
  it("calcule les vêtements manquants sans compter deux fois un vêtement", () => {
    const targets: WardrobeTarget[] = [
      {
        id: 42,
        category: "bottom",
        type: "pants",
        season: Season.AUTUMN,
        features: [],
        suggestedQuantity: 5,
      },
      {
        id: 43,
        category: "bottom",
        type: "pants",
        season: Season.AUTUMN,
        features: [GarmentFeature.WATERPROOF],
        suggestedQuantity: 1,
      },
    ]

    const garments: Garment[] = [
      {
        id: 1,
        householdId: "household-1",
        category: "bottom",
        type: "pants",
        size: "104",
        brand: "Decathlon",
        color: "bleu",
        seasons: [Season.AUTUMN],
        features: [GarmentFeature.WATERPROOF],
        status: GarmentStatus.IN_CLOSET,
      },
    ]

    const results = calculateWardrobeNeeds(garments, targets)

    const totalMatched = results.reduce(
      (sum, result) => sum + result.matchedGarmentIds.length,
      0
    )

    const totalMissing = results.reduce(
      (sum, result) => sum + result.missingQuantity,
      0
    )

    expect(totalMatched).toBe(1)
    expect(totalMissing).toBe(5)
  })

  it("réserve le pantalon imperméable au besoin spécifique", () => {
    const targets: WardrobeTarget[] = [
      {
        id: 42,
        category: "bottom",
        type: "pants",
        season: Season.AUTUMN,
        features: [],
        suggestedQuantity: 5,
      },
      {
        id: 43,
        category: "bottom",
        type: "pants",
        season: Season.AUTUMN,
        features: [GarmentFeature.WATERPROOF],
        suggestedQuantity: 1,
      },
    ]

    type BottomGarment = Extract<Garment, { category: "bottom" }>

    const ordinaryPants: BottomGarment = {
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
      ordinaryPants,
      { ...ordinaryPants, id: 2 },
      { ...ordinaryPants, id: 3 },
      { ...ordinaryPants, id: 4 },
      {
        ...ordinaryPants,
        id: 5,
        features: [GarmentFeature.WATERPROOF],
      },
    ]

    const results = calculateWardrobeNeeds(garments, targets)

    expect(results[0]?.matchedGarmentIds).toHaveLength(4)
    expect(results[0]?.missingQuantity).toBe(1)

    expect(results[1]?.matchedGarmentIds).toEqual([5])
    expect(results[1]?.missingQuantity).toBe(0)
  })

  it("répartit les vêtements polyvalents entre deux besoins spécifiques", () => {
    const targets: WardrobeTarget[] = [
      {
        id: 100,
        category: "bottom",
        type: "pants",
        season: Season.WINTER,
        features: [GarmentFeature.WATERPROOF],
        suggestedQuantity: 1,
      },
      {
        id: 101,
        category: "bottom",
        type: "pants",
        season: Season.WINTER,
        features: [GarmentFeature.WARM],
        suggestedQuantity: 1,
      },
    ]

    type BottomGarment = Extract<Garment, { category: "bottom" }>

    const versatilePants: BottomGarment = {
      id: 10,
      householdId: "household-1",
      category: "bottom",
      type: "pants",
      size: "104",
      brand: "Decathlon",
      color: "bleu",
      seasons: [Season.WINTER],
      features: [GarmentFeature.WATERPROOF, GarmentFeature.WARM],
      status: GarmentStatus.IN_CLOSET,
    }

    const garments: Garment[] = [
      versatilePants,
      {
        ...versatilePants,
        id: 11,
        features: [GarmentFeature.WATERPROOF],
      },
    ]

    const results = calculateWardrobeNeeds(garments, targets)

    expect(results[0]?.matchedGarmentIds).toEqual([11])
    expect(results[1]?.matchedGarmentIds).toEqual([10])

    expect(results[0]?.missingQuantity).toBe(0)
    expect(results[1]?.missingQuantity).toBe(0)
  })
})
  describe("isGarmentAvailable", () => {
    it("accepte un vêtement dans le placard", () => {
      expect(isGarmentAvailable(garment)).toBe(true)
    })

    it("accepte un vêtement bientôt à remplacer", () => {
      expect(
        isGarmentAvailable({
          ...garment,
          status: GarmentStatus.SOON,
        })
      ).toBe(true)
    })

    it("exclut un vêtement à remplacer", () => {
      expect(
        isGarmentAvailable({
          ...garment,
          status: GarmentStatus.TO_REPLACE,
        })
      ).toBe(false)
    })

    it("exclut un vêtement destiné à la vente", () => {
      expect(
        isGarmentAvailable({
          ...garment,
          status: GarmentStatus.TO_SELL,
        })
      ).toBe(false)
    })
  })

  describe("calculateChildWardrobeNeeds", () => {
  it("ne compte que les vêtements adaptés à la taille de l'enfant", () => {
    const child: Child = {
      id: 1,
      householdId: "household-1",
      firstName: "Alice",
      birthDate: "2022-05-10",
      heightCm: 102,
      weightKg: 16,
      shoeSizeEu: 27,
    }

    const target: WardrobeTarget = {
      id: 300,
      category: "top",
      type: "tshirt",
      season: Season.AUTUMN,
      features: [],
      suggestedQuantity: 3,
    }

    type TopGarment = Extract<Garment, { category: "top" }>

    const tshirt: TopGarment = {
      id: 10,
      householdId: "household-1",
      category: "top",
      type: "tshirt",
      size: "104",
      brand: "Petit Bateau",
      color: "bleu",
      seasons: [Season.AUTUMN],
      features: [],
      status: GarmentStatus.IN_CLOSET,
    }

    const garments: Garment[] = [
      { ...tshirt, id: 11, size: "98" },
      { ...tshirt, id: 12, size: "104" },
      { ...tshirt, id: 13, size: "110" },
    ]

    const results = calculateChildWardrobeNeeds(
      child,
      garments,
      [target]
    )

    expect(results[0]?.matchedGarmentIds).toEqual([12])
    expect(results[0]?.requiredQuantity).toBe(3)
    expect(results[0]?.missingQuantity).toBe(2)
  })
})

describe("calculateAssignedChildWardrobeNeeds", () => {
  it("ne compte que les vêtements attribués à l'enfant", () => {
    const child: Child = {
      id: 1,
      householdId: "household-1",
      firstName: "Alice",
      birthDate: "2022-05-10",
      heightCm: 102,
      weightKg: 16,
      shoeSizeEu: 27,
    }

    const target: WardrobeTarget = {
      id: 400,
      category: "top",
      type: "tshirt",
      season: Season.AUTUMN,
      features: [],
      suggestedQuantity: 3,
    }

    const tshirt: TopGarment = {
      id: 10,
      householdId: "household-1",
      category: "top",
      type: "tshirt",
      size: "104",
      brand: "Petit Bateau",
      color: "bleu",
      seasons: [Season.AUTUMN],
      features: [],
      status: GarmentStatus.IN_CLOSET,
    }

    const garments: Garment[] = [
      tshirt,                    // Alice
      { ...tshirt, id: 11 },    // Hugo
      { ...tshirt, id: 12 },    // Stock familial
    ]

    const assignments = [
      {
        id: "assignment-1",
        garmentId: 10,
        childId: 1,
        startDate: "2026-01-01",
      },
      {
        id: "assignment-2",
        garmentId: 11,
        childId: 2,
        startDate: "2026-01-01",
      },
    ]

    const results = calculateAssignedChildWardrobeNeeds(
      child,
      garments,
      assignments,
      [target]
    )

    expect(results[0]?.matchedGarmentIds).toEqual([10])
    expect(results[0]?.requiredQuantity).toBe(3)
    expect(results[0]?.missingQuantity).toBe(2)
  })
})
});

