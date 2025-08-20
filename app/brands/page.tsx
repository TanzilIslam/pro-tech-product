import { Suspense } from 'react'
import { CardLoader } from '@/components/cardLoader'
import BrandsList from '@/components/page/brands/list'

export default async function BrandsPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Brands</h1>

      <Suspense fallback={<CardLoader numberOfCards={12} />}>
        <BrandsList />
      </Suspense>
    </>
  )
}
