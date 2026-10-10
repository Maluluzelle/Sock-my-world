import type {
  GarmentCategory,
  GarmentType
} from "./Garment"

import {
  Season,
  GarmentFeature
} from "./Garment"

type WardrobeTargetBase = {
  id: number
  features: GarmentFeature[]
  season: Season
  suggestedQuantity: number
  targetQuantity?: number
}

export type WardrobeTarget = {
  [C in GarmentCategory]: WardrobeTargetBase & {
    category: C
    type: GarmentType<C>
  }
}[GarmentCategory]