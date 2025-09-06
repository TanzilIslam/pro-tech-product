import { Suspense } from 'react'
import { CardLoader } from '@/components/cardLoader'
import { ProductsList } from '@/components/page/products/list'
import { getAllProducts } from '@/service/products'

export default async function ProductsPage() {
  const products = await getAllProducts()
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Products</h1>

      <Suspense fallback={<CardLoader numberOfCards={12} />}>
        <ProductsList initialProducts={products} />
      </Suspense>
    </>
  )
}
