import type { WardrobeTarget } from "../types/Wardrobe"

import {
  Season,
  GarmentFeature
} from "../types/Garment"

export const wardrobeSuggestions: WardrobeTarget[] = [
  {
    id: 1,
    category: "bottom",
    type: "pants",
    features: [GarmentFeature.WARM],
    season: Season.WINTER,
    suggestedQuantity: 5
  },
  {
    id: 2,
    category: "top",
    type: "tshirt",
    features: [GarmentFeature.LONGSLEEVED],
    season: Season.WINTER,
    suggestedQuantity: 5
  },
  {
    id: 3,
    category: "top",
    type: "sweater",
    features: [GarmentFeature.WARM],
    season: Season.WINTER,
    suggestedQuantity: 3
  },
  {
    id: 4,
    category: "top",
    type: "sweatshirt",
    features: [GarmentFeature.WARM],
    season: Season.WINTER,
    suggestedQuantity: 3
  },
  {
    id: 5,
    category: "underwear",
    type: "tights",
    features: [],
    season: Season.WINTER,
    suggestedQuantity: 5
  },
  {
    id: 6,
    category: "bottom",
    type: "leggings",
    features: [GarmentFeature.THERMAL],
    season: Season.WINTER,
    suggestedQuantity: 3
  },
  {
    id: 7,
    category: "underwear",
    type: "undershirt",
    features: [GarmentFeature.THERMAL],
    season: Season.WINTER,
    suggestedQuantity: 3
  },
  {
    id: 8,
    category: "coat",
    type: "winterCoat",
    features: [
      GarmentFeature.WARM,
      GarmentFeature.WATERPROOF
    ],
    season: Season.WINTER,
    suggestedQuantity: 1
  },
  {
    id: 9,
    category: "shoes",
    type: "boots",
    features: [
      GarmentFeature.WARM,
      GarmentFeature.WATERPROOF,
      GarmentFeature.SNOWPROOF
    ],
    season: Season.WINTER,
    suggestedQuantity: 1
  },
  {
    id: 10,
    category: "shoes",
    type: "sneakers",
    features: [GarmentFeature.WATERPROOF],
    season: Season.WINTER,
    suggestedQuantity: 1
  },
  {
    id: 11,
    category: "sleepwear",
    type: "pyjamas",
    features: [GarmentFeature.WARM],
    season: Season.WINTER,
    suggestedQuantity: 3
  },
  {
    id: 12,
    category: "underwear",
    type: "underpants",
    features: [],
    season: Season.WINTER,
    suggestedQuantity: 7
  },
  {
    id: 13,
    category: "underwear",
    type: "socks",
    features: [],
    season: Season.WINTER,
    suggestedQuantity: 5
  },
  {
    id: 14,
    category: "bottom",
    type: "pants",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 5
  },
  {
    id: 15,
    category: "bottom",
    type: "pants",
    features: [GarmentFeature.WATERPROOF],
    season: Season.SPRING,
    suggestedQuantity: 1
  },
  {
    id: 16,
    category: "bottom",
    type: "leggings",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 3
  },
  {
    id: 17,
    category: "top",
    type: "tshirt",
    features: [GarmentFeature.LONGSLEEVED],
    season: Season.SPRING,
    suggestedQuantity: 5
  },
  {
    id: 18,
    category: "top",
    type: "tshirt",
    features: [GarmentFeature.SHORTSLEEVED],
    season: Season.SPRING,
    suggestedQuantity: 3
  },
  {
    id: 19,
    category: "top",
    type: "sweater",
    features: [GarmentFeature.LIGHT],
    season: Season.SPRING,
    suggestedQuantity: 2
  },
  {
    id: 20,
    category: "top",
    type: "sweatshirt",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 2
  },
  {
    id: 21,
    category: "top",
    type: "cardigan",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 2
  },
  {
    id: 22,
    category: "coat",
    type: "raincoat",
    features: [GarmentFeature.WATERPROOF],
    season: Season.SPRING,
    suggestedQuantity: 1
  },
  {
    id: 23,
    category: "shoes",
    type: "sneakers",
    features: [GarmentFeature.WATERPROOF],
    season: Season.SPRING,
    suggestedQuantity: 2
  },
  {
    id: 24,
    category: "shoes",
    type: "boots",
    features: [GarmentFeature.WATERPROOF],
    season: Season.SPRING,
    suggestedQuantity: 1
  },
  {
    id: 25,
    category: "sleepwear",
    type: "pyjamas",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 3
  },
  {
    id: 26,
    category: "underwear",
    type: "underpants",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 7
  },
  {
    id: 27,
    category: "underwear",
    type: "socks",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 5
  },
  {
    id: 28,
    category: "underwear",
    type: "tights",
    features: [],
    season: Season.SPRING,
    suggestedQuantity: 3
  },
  {
    id: 29,
    category: "top",
    type: "shirt",
    features: [
      GarmentFeature.LONGSLEEVED,
      GarmentFeature.LIGHT
    ],
    season: Season.SUMMER,
    suggestedQuantity: 4
  },
  {
    id: 30,
    category: "top",
    type: "tshirt",
    features: [GarmentFeature.SHORTSLEEVED],
    season: Season.SUMMER,
    suggestedQuantity: 5
  },
  {
    id: 31,
    category: "bottom",
    type: "pants",
    features: [GarmentFeature.LIGHT],
    season: Season.SUMMER,
    suggestedQuantity: 5
  },
  {
    id: 32,
    category: "bottom",
    type: "leggings",
    features: [GarmentFeature.LIGHT],
    season: Season.SUMMER,
    suggestedQuantity: 2
  },
  {
    id: 33,
    category: "top",
    type: "sweatshirt",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 1
  },
  {
    id: 34,
    category: "top",
    type: "cardigan",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 1
  },
  {
    id: 35,
    category: "coat",
    type: "raincoat",
    features: [GarmentFeature.WATERPROOF],
    season: Season.SUMMER,
    suggestedQuantity: 1
  },
  {
    id: 36,
    category: "shoes",
    type: "sneakers",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 1
  },
  {
    id: 37,
    category: "shoes",
    type: "sandals",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 1
  },
  {
    id: 38,
    category: "swimwear",
    type: "swimsuit",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 2
  },
  {
    id: 39,
    category: "sleepwear",
    type: "pyjamas",
    features: [GarmentFeature.LIGHT],
    season: Season.SUMMER,
    suggestedQuantity: 3
  },
  {
    id: 40,
    category: "underwear",
    type: "underpants",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 7
  },
  {
    id: 41,
    category: "underwear",
    type: "socks",
    features: [],
    season: Season.SUMMER,
    suggestedQuantity: 5
  },
  // AUTUMN

{
  id: 42,
  category: "bottom",
  type: "pants",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 5
},
{
  id: 43,
  category: "bottom",
  type: "pants",
  features: [GarmentFeature.WATERPROOF],
  season: Season.AUTUMN,
  suggestedQuantity: 1
},
{
  id: 44,
  category: "bottom",
  type: "leggings",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 3
},
{
  id: 45,
  category: "top",
  type: "tshirt",
  features: [GarmentFeature.LONGSLEEVED],
  season: Season.AUTUMN,
  suggestedQuantity: 7
},
{
  id: 46,
  category: "top",
  type: "sweater",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 3
},
{
  id: 47,
  category: "top",
  type: "sweatshirt",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 3
},
{
  id: 48,
  category: "top",
  type: "cardigan",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 2
},
{
  id: 49,
  category: "coat",
  type: "raincoat",
  features: [GarmentFeature.WATERPROOF],
  season: Season.AUTUMN,
  suggestedQuantity: 1
},
{
  id: 50,
  category: "shoes",
  type: "sneakers",
  features: [GarmentFeature.WATERPROOF],
  season: Season.AUTUMN,
  suggestedQuantity: 1
},
{
  id: 51,
  category: "shoes",
  type: "boots",
  features: [GarmentFeature.WATERPROOF],
  season: Season.AUTUMN,
  suggestedQuantity: 1
},
{
  id: 52,
  category: "sleepwear",
  type: "pyjamas",
  features: [GarmentFeature.WARM],
  season: Season.AUTUMN,
  suggestedQuantity: 3
},
{
  id: 53,
  category: "underwear",
  type: "underpants",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 7
},
{
  id: 54,
  category: "underwear",
  type: "socks",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 5
},
{
  id: 55,
  category: "underwear",
  type: "tights",
  features: [],
  season: Season.AUTUMN,
  suggestedQuantity: 5
}
]