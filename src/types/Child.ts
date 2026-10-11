export type Gender = "girl" | "boy"

export type Child = {
  id: number
  firstName: string
  birthDate: string
  gender?: Gender
  householdId: string

  heightCm: number
  weightKg: number
  shoeSizeEu: number
}