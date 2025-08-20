import { supabaseClient } from '@/service/supabaseClient'
import { CATEGORY_TABLE } from '@/service/dbTables'
import { Category } from '@/lib/types'

const getAllCategories = async (): Promise<Category[]> => {
  const { data, error } = await supabaseClient.from(CATEGORY_TABLE).select('*')
  if (error) {
    throw error
  }
  return data as Category[]
}

const getCategoriesWithBrands = async (): Promise<Category[]> => {
  const { data, error } = await supabaseClient
    .from(CATEGORY_TABLE)
    .select('*,pro_tech_categories_brands(pro_tech_brands(id,name,image))')
  if (error) {
    throw error
  }
  return data as Category[]
}

export { getAllCategories, getCategoriesWithBrands }
