
export type Garment = {
  id: number
  category: GarmentCategory
  type: GarmentType
  features: GarmentFeature[]
  size: string

  season: Season[]

  color: string
  brand: string

  occasion: OccasionCategory

  picture: string

  location: string

  status: string

}

