export const CLOTHING_SIZES = {
  "80": "12-18 months / 80 cm",
  "86": "18-24 months / 86 cm",
  "90": "90 cm",
  "92": "24-36 months / 92 cm",
  "98": "3 year old / 98 cm",
  "104": "4 year old / 104 cm",
  "110": "5 year old / 110 cm",
  "116": "6 year old / 116 cm",
  "122": "7 year old / 122 cm"
} as const

export type ClothingSize =
  keyof typeof CLOTHING_SIZES

export const SHOE_SIZES = [
  "18", "19", "20", "21", "22",
  "23", "24", "25", "26", "27",
  "28", "29", "30", "31", "32",
  "33", "34", "35"
] as const

export type ShoeSize =
  typeof SHOE_SIZES[number]