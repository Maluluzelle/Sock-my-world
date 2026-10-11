import { describe, expect, it } from "vitest"
import type { Child } from "../types/Child"
import type { Garment } from "../types/Garment"
import { GarmentStatus, Season } from "../types/Garment"
import { isGarmentSizeSuitable } from "./garmentSizing"

describe("isGarmentSizeSuitable", () => {
  const child: Child = {
    id: 1,
    householdId: "household-1",
    firstName: "Alice",
    birthDate: "2022-05-10",
    heightCm: 102,
    weightKg: 16,
    shoeSizeEu: 27,
  }

  const tshirt: Extract<Garment, { category: "top" }> = {
    id: 1,
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

  const shoes: Extract<Garment, { category: "shoes" }> = {
    id: 2,
    householdId: "household-1",
    category: "shoes",
    type: "sneakers",
    size: "27",
    brand: "Geox",
    color: "blanc",
    seasons: [Season.AUTUMN],
    features: [],
    status: GarmentStatus.IN_CLOSET,
  }

  it("accepte un vêtement à la taille de l'enfant", () => {
    expect(isGarmentSizeSuitable(tshirt, child)).toBe(true)
  })

  it("refuse un vêtement trop petit", () => {
    expect(
      isGarmentSizeSuitable({ ...tshirt, size: "98" }, child)
    ).toBe(false)
  })

  it("accepte des chaussures à la bonne pointure", () => {
    expect(isGarmentSizeSuitable(shoes, child)).toBe(true)
  })

  it("refuse des chaussures d'une autre pointure", () => {
    expect(
      isGarmentSizeSuitable({ ...shoes, size: "28" }, child)
    ).toBe(false)
  })

  it("refuse un vêtement trop grand", () => {
  expect(
    isGarmentSizeSuitable({ ...tshirt, size: "110" }, child)
  ).toBe(false)
})

  it("refuse un vêtement beaucoup trop grand", () => {
  expect(
    isGarmentSizeSuitable({ ...tshirt, size: "122" }, child)
  ).toBe(false)
})
})