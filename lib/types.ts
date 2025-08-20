export type Brand = {
  id: string
  name: string
  image?: string
  created_at: string
  country?: string
  factory_locations?: string[]
}
export type CategoryBrandRelation = {
  pro_tech_brands: Brand
}
export type Category = {
  id: string
  name: string
  image?: string
  description?: string
  created_at: string
  pro_tech_categories_brands: CategoryBrandRelation[]
}
