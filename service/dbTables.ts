export const ROOT_TABLE = 'pro_tech'

// tables
export const BRAND_TABLE = `${ROOT_TABLE}_brands`
export const CATEGORY_TABLE = `${ROOT_TABLE}_categories`
export const PRODUCT_TABLE = `${ROOT_TABLE}_products`
export const ENQUIRY_TABLE = `${ROOT_TABLE}_enquiries`

// junction tables
export const CATEGORY_BRAND_JUNCTION_TABLE = `${ROOT_TABLE}_categories_brands`
export const PRODUCT_BRAND_JUNCTION_TABLE = `${ROOT_TABLE}_products_brands`

// storage buckets
export const BRAND_STORAGE_BUCKET = `${ROOT_TABLE}_brands`
export const PRODUCT_STORAGE_BUCKET = `${ROOT_TABLE}_products`
export const CATEGORY_STORAGE_BUCKET = `${ROOT_TABLE}_categories`
export const CKEDITOR_STORAGE_BUCKET = `${ROOT_TABLE}_ck_editor`
