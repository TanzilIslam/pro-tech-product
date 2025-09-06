import { supabaseClient } from '@/service/supabaseClient'
import {
  PRODUCT_TABLE,
  CATEGORY_TABLE,
  BRAND_TABLE,
  PRODUCT_BRAND_JUNCTION_TABLE,
} from '@/service/dbTables'
import { Product } from '@/lib/types'

const getAllProducts = async (): Promise<Product[]> => {
  const { data, error } = await supabaseClient
    .from(PRODUCT_TABLE)
    .select(
      `*,category: ${CATEGORY_TABLE} (*),${PRODUCT_BRAND_JUNCTION_TABLE} (*, ${BRAND_TABLE} (name,image))`
    )
  if (error) {
    throw error
  }
  return data as Product[]
}

export { getAllProducts }
