export enum HouseholdRole {
  ADMIN = "ADMIN",
  MEMBER = "MEMBER"
}

export type HouseholdMember = {
  id: string
  householdId: string
  userId: string
  role: HouseholdRole
}