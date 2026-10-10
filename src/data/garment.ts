import type { Garment } from "../types/Garment"
import type { ClothingSize } from "../types/GarmentSize"

import {
  Season,
  GarmentFeature,
  GarmentStatus
} from "../types/Garment"

const testSize: ClothingSize = "98"

const pantalon: Garment = {
  id: 1,
  category: "bottom",
  type: "pants",
  brand: "Jacadi",
  size: "98",
  labelSize: "3 year old",
  color: "Bleu marine",
  seasons: [Season.AUTUMN, Season.WINTER],
  features: [GarmentFeature.WARM],
  status: GarmentStatus.IN_CLOSET
}

export default pantalon

const baskets: Garment = {
  id: 2,
  category: "shoes",
  type: "sneakers",
  size: "25",
  brand: "Geox",
  color: "Bleu",
  seasons: [Season.SPRING],
  features: [],
  status: GarmentStatus.IN_CLOSET
}