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
export type Specification = {
  key: string
  value: string
}
export type ProductBrandRelation = {
  pro_tech_brands: Brand
}
export type Product = {
  id: string
  name: string
  part_number: string
  description: string
  image: string
  gallery_images: string[]
  availability: 'In Stock' | 'Out of Stock' | string
  category_id: string
  created_at: string
  specifications: Specification[]
  pro_tech_products_brands: ProductBrandRelation[]
  category?: Category
  slug: string
}

export interface ContactFormData {
  customer_name: string
  company_name?: string // Optional field
  email_address: string
  phone_number?: string // Optional field
  product_id: string // Assuming UUID
  product_name: string
  message: string // We need a message field
}
