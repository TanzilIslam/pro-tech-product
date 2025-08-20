import { Suspense } from 'react'
import { CardLoader } from '@/components/cardLoader'
import CategoriesList from '@/components/page/categories/list'

export default async function CategoriesPage() {
  return (
    <>
      <h1 className="text-2xl font-bold mb-6">Categories</h1>

      <Suspense fallback={<CardLoader numberOfCards={12} />}>
        <CategoriesList />
      </Suspense>
    </>
  )
}
