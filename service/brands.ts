import { supabaseClient } from '@/service/supabaseClient'
import { BRAND_TABLE } from '@/service/dbTables'
import { Brand } from '@/lib/types'

const getAllBrands = async (): Promise<Brand[]> => {
  const { data, error } = await supabaseClient.from(BRAND_TABLE).select('*')
  if (error) {
    throw error
  }
  return data as Brand[]
}

export { getAllBrands }
