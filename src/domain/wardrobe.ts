import type { Garment } from "../types/Garment"
import type { WardrobeTarget, WardrobeTargetResult } from "../types/Wardrobe"
import { GarmentStatus } from "../types/Garment"
import type { Child } from "../types/Child"
import { isGarmentSizeSuitable } from "./garmentSizing"
import type { GarmentAssignment } from "../types/GarmentAssignment"
import { getGarmentsForChild } from "./garmentAssignments"

export function matchesWardrobeTarget(
  garment: Garment,
  target: WardrobeTarget
): boolean {
  return (
    garment.category === target.category &&
    garment.type === target.type &&
    garment.seasons.includes(target.season) &&
    target.features.every((feature) =>
      garment.features.includes(feature)
    )
  )
}

export function getEffectiveQuantity(
  target: WardrobeTarget
): number {
  return target.targetQuantity ?? target.suggestedQuantity
}

export function calculateWardrobeNeeds(
  garments: Garment[],
  targets: WardrobeTarget[]
): WardrobeTargetResult[] {
  const availableGarments = garments.filter(isGarmentAvailable)
  const slots = targets.flatMap((target, targetIndex) =>
    Array.from(
      { length: getEffectiveQuantity(target) },
      () => targetIndex
    )
  )

  const assignedGarmentBySlot = new Map<number, number>()

  function tryAssign(
    slotIndex: number,
    visitedGarments: Set<number>
  ): boolean {
    const target = targets[slots[slotIndex]!]

    if (!target) return false

    for (let garmentIndex = 0; garmentIndex < availableGarments.length; garmentIndex++) {
      const garment = availableGarments[garmentIndex]!

      if (
        visitedGarments.has(garmentIndex) ||
        !matchesWardrobeTarget(garment, target)
      ) {
        continue
      }

      visitedGarments.add(garmentIndex)

      const previousSlot = assignedGarmentBySlot.get(garmentIndex)

      if (previousSlot !== undefined) {
        const previousTarget = targets[slots[previousSlot]!]!

        if (previousTarget.features.length > target.features.length) {
          continue
        }
      }

      if (previousSlot === undefined || tryAssign(previousSlot, visitedGarments)) {
        assignedGarmentBySlot.set(garmentIndex, slotIndex)
        return true
      }
    }

    return false
  }

  const slotOrder = slots
    .map((_, slotIndex) => slotIndex)
    .sort((a, b) => {
      const targetA = targets[slots[a]!]!
      const targetB = targets[slots[b]!]!

      return targetB.features.length - targetA.features.length
    })

  for (const slotIndex of slotOrder) {
    tryAssign(slotIndex, new Set<number>())
  }

  return targets.map((target, targetIndex) => {
    const matchedGarmentIds: number[] = []

    for (const [garmentIndex, slotIndex] of assignedGarmentBySlot) {
      if (slots[slotIndex] === targetIndex) {
        matchedGarmentIds.push(availableGarments[garmentIndex]!.id)
      }
    }

    const requiredQuantity = getEffectiveQuantity(target)

    return {
      target,
      requiredQuantity,
      matchedGarmentIds,
      missingQuantity: requiredQuantity - matchedGarmentIds.length
    }
  })
}

  export function isGarmentAvailable(
    garment: Garment
  ): boolean {
    return (
      garment.status === GarmentStatus.IN_CLOSET ||
      garment.status === GarmentStatus.SOON
    )
  }

  export function calculateChildWardrobeNeeds(
    child: Child,
    garments: Garment[],
    targets: WardrobeTarget[]
  ): WardrobeTargetResult[] {
    const suitableGarments = garments.filter((garment) =>
      isGarmentSizeSuitable(garment, child)
    )

    return calculateWardrobeNeeds(suitableGarments, targets)
  }

  export function calculateAssignedChildWardrobeNeeds(
  child: Child,
  garments: Garment[],
  assignments: GarmentAssignment[],
  targets: WardrobeTarget[]
): WardrobeTargetResult[] {
  const childGarments = getGarmentsForChild(
    child.id,
    garments,
    assignments
  )

  return calculateChildWardrobeNeeds(
    child,
    childGarments,
    targets
  )
}