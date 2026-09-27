export type Gender = "girl" | "boy"

export type Child = {
  id: number
  firstName: string
  birthDate: string
  gender?: Gender

  heightCm: number
  weightKg: number
  shoeSizeEu: number
}