import type { Garment } from "../types/Garment"
import type { Child } from "../types/Child"
import { CLOTHING_SIZES } from "../types/GarmentSize"

export function isGarmentSizeSuitable(
  garment: Garment,
  child: Child
): boolean {
  if (garment.category === "shoes") {
    return Number(garment.size) === child.shoeSizeEu
  }

  const suitableSize = Object.keys(CLOTHING_SIZES)
    .map(Number)
    .filter((size) => Number.isFinite(size))
    .sort((a, b) => a - b)
    .find((size) => size >= child.heightCm)

  if (suitableSize === undefined) {
    return false
  }

  return Number(garment.size) === suitableSize
}