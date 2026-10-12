
import { GarmentFeature } from "../types/Garment"

export const garmentTypeLabels: Record<string, string> = {
  tshirt: "T-shirts",
  shirt: "Chemises",
  sweater: "Pulls",
  sweatshirt: "Sweats",
  cardigan: "Gilets",

  pants: "Pantalons",
  shorts: "Shorts",
  skirt: "Jupes",
  leggings: "Leggings",

  dress: "Robes",
  pinafore: "Robes chasubles",
  overall: "Salopettes",

  raincoat: "Imperméables",
  winterCoat: "Manteaux d'hiver",
  jacket: "Vestes",

  sneakers: "Baskets",
  boots: "Bottes",
  sandals: "Sandales",
  slippers: "Chaussons",

  underpants: "Culottes / slips",
  socks: "Chaussettes",
  tights: "Collants",
  undershirt: "Maillots de corps",
  onesie: "Bodies",

  swimsuit: "Maillots de bain",
  pyjamas: "Pyjamas",

  other: "Autres",
}

export const garmentFeatureLabels: Record<GarmentFeature, string> = {
  [GarmentFeature.WARM]: "Chaud",
  [GarmentFeature.LIGHT]: "Léger",
  [GarmentFeature.WATERPROOF]: "Imperméable",
  [GarmentFeature.SNOWPROOF]: "Adapté à la neige",
  [GarmentFeature.SPORT]: "Sport",
  [GarmentFeature.THERMAL]: "Thermique",
  [GarmentFeature.SHORTSLEEVED]: "Manches courtes",
  [GarmentFeature.LONGSLEEVED]: "Manches longues",
  [GarmentFeature.OCCASION]: "Habillé",
}
