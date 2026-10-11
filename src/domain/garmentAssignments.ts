import type { GarmentAssignment } from "../types/GarmentAssignment"
import type { Garment } from "../types/Garment"

export function getCurrentAssignment(
  garmentId: number,
  assignments: GarmentAssignment[]
): GarmentAssignment | undefined {
  return assignments.find(
    (assignment) =>
      assignment.garmentId === garmentId &&
      assignment.endDate === undefined
  )
}

export function assignGarmentToChild(
  garmentId: number,
  childId: number,
  assignments: GarmentAssignment[],
  startDate: string,
  assignmentId: string
): GarmentAssignment[] {
  const currentAssignment = getCurrentAssignment(
    garmentId,
    assignments
  )

  if (currentAssignment) {
    throw new Error(
      "Ce vêtement est déjà attribué à un enfant."
    )
  }

  const newAssignment: GarmentAssignment = {
    id: assignmentId,
    garmentId,
    childId,
    startDate
  }

  return [...assignments, newAssignment]
}

export function unassignGarment(
  garmentId: number,
  assignments: GarmentAssignment[],
  endDate: string
): GarmentAssignment[] {
  const currentAssignment = getCurrentAssignment(
    garmentId,
    assignments
  )

  if (!currentAssignment) {
    throw new Error(
      "Ce vêtement n'est attribué à aucun enfant."
    )
  }

  if (endDate < currentAssignment.startDate) {
    throw new Error(
      "La date de fin ne peut pas précéder la date de début."
    )
  }

  return assignments.map((assignment) =>
    assignment.id === currentAssignment.id
      ? { ...assignment, endDate }
      : assignment
  )
}

export function transferGarment(
  garmentId: number,
  newChildId: number,
  assignments: GarmentAssignment[],
  transferDate: string,
  newAssignmentId: string
): GarmentAssignment[] {
  const currentAssignment = getCurrentAssignment(
    garmentId,
    assignments
  )

  if (!currentAssignment) {
    throw new Error(
      "Ce vêtement n'est attribué à aucun enfant."
    )
  }

  if (currentAssignment.childId === newChildId) {
    throw new Error(
      "Ce vêtement est déjà attribué à cet enfant."
    )
  }

  if (transferDate < currentAssignment.startDate) {
    throw new Error(
      "La date de transfert ne peut pas précéder la date d'affectation."
    )
  }

  const updatedAssignments = unassignGarment(
    garmentId,
    assignments,
    transferDate
  )

  return assignGarmentToChild(
    garmentId,
    newChildId,
    updatedAssignments,
    transferDate,
    newAssignmentId
  )
}

export function getGarmentsForChild(
  childId: number,
  garments: Garment[],
  assignments: GarmentAssignment[]
): Garment[] {
  const garmentIds = new Set(
    assignments
      .filter(
        (assignment) =>
          assignment.childId === childId &&
          assignment.endDate === undefined
      )
      .map((assignment) => assignment.garmentId)
  )

  return garments.filter((garment) => garmentIds.has(garment.id))
}