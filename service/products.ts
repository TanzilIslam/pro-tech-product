import { supabaseClient } from '@/service/supabaseClient'
import {
  PRODUCT_TABLE,
  CATEGORY_TABLE,
  BRAND_TABLE,
  PRODUCT_BRAND_JUNCTION_TABLE,
  ENQUIRY_TABLE,
} from '@/service/dbTables'
import { Product, ContactFormData } from '@/lib/types'

const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabaseClient
    .from(PRODUCT_TABLE)
    .select(
      `*,category: ${CATEGORY_TABLE} (*),${PRODUCT_BRAND_JUNCTION_TABLE} (*, ${BRAND_TABLE} (id,name,image))`
    )
  if (error) {
    throw error
  }
  return data as Product[]
}
const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const { data, error } = await supabaseClient
    .from(PRODUCT_TABLE)
    .select(
      `*,category: ${CATEGORY_TABLE} (*),${PRODUCT_BRAND_JUNCTION_TABLE} (*, ${BRAND_TABLE} (id,name,image))`
    )
    .eq('slug', slug)
  if (error) {
    throw error
  }
  return data[0] as Product
}
const postProductEnquiry = async (enquiry: ContactFormData) => {
  const { data, error } = await supabaseClient
    .from(ENQUIRY_TABLE)
    .insert({ ...enquiry, is_read: false })
  if (error) {
    throw error
  }
  return data
}

export { getAllProducts, getProductBySlug, postProductEnquiry }
