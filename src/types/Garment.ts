import type { ClothingSize, ShoeSize } from "./GarmentSize"

// 1. Catégories et types de vêtements associés

export const GARMENT_TYPES = {
  top: [
    "tshirt",
    "shirt",
    "sweater",
    "sweatshirt",
    "cardigan",
    "other"
  ],
  bottom: [
    "pants",
    "shorts",
    "skirt",
    "leggings",
    "other"
  ],
  dress: [
    "dress",
    "pinafore",
    "other"
  ],
  coat: [
    "raincoat",
    "winterCoat",
    "jacket",
    "other"
  ],
  shoes: [
    "sneakers",
    "boots",
    "sandals",
    "slippers",
    "other"
  ],
  underwear: [
    "underpants",
    "socks",
    "tights",
    "undershirt",
    "other"
  ],
  swimwear: [
    "swimsuit",
    "swimShorts",
    "other"
  ],
  sleepwear: [
    "pyjamas",
    "other"
  ]  
} as const


// 2. Types déduits automatiquement

export type GarmentCategory =
  keyof typeof GARMENT_TYPES

export type GarmentType<C extends GarmentCategory> =
  (typeof GARMENT_TYPES)[C][number]


// 3. Saisons

export enum Season {
  SPRING = "spring",
  SUMMER = "summer",
  AUTUMN = "autumn",
  WINTER = "winter"
}


// 4. Caractéristiques

export enum GarmentFeature {
  WARM = "warm",
  LIGHT = "light",
  WATERPROOF = "waterproof",
  SNOWPROOF = "snowproof",
  SPORT = "sport",
  THERMAL = "thermal",
  SHORTSLEEVED = "shortsleeved",
  LONGSLEEVED = "longsleeved",
  OCCASION = "occasion"
}

// 5. Cycle de vie

export enum GarmentStatus {
  IN_CLOSET = "inCloset",
  SOON = "soon",
  TO_REPLACE = "toReplace",
  TO_SELL = "toSell",
  TO_DONATE = "toDonate",
  TO_DISCARD = "toDiscard",
  SOLD = "sold",
  DONATED = "donated",
  DISCARDED = "discarded"
}

// 6. Propriétés communes à tous les vêtements

type GarmentBase = {
  id: number
  brand: string
  labelSize?: string
  color: string

  customType?: string

  seasons: Season[]
  features: GarmentFeature[]

  status: GarmentStatus

  photo?: string
  location?: string

  householdId: string
}


// 7. Type final avec catégorie et type liés

export type Garment = {
  [C in GarmentCategory]: GarmentBase & {
    category: C
    type: GarmentType<C>
    size: C extends "shoes" ? ShoeSize : ClothingSize
  }
}[GarmentCategory]