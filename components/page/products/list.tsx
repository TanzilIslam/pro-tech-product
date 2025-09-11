'use client'
import { ProductCard } from '@/components/page/products/productCard'
import { Filter } from '@/components/page/products/filter'
import { Product } from '@/lib/types'
import { useState, useEffect } from 'react'

interface ProductsListProps {
  initialProducts: Product[]
}

export function ProductsList({ initialProducts }: ProductsListProps) {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts)

  const handleFilterUpdate = (filter: {
    categoryId?: string
    brandId?: string
    keywords?: string
  }) => {
    let productsToFilter = [...initialProducts]

    if (filter.categoryId) {
      productsToFilter = productsToFilter.filter((p) => p.category?.id === filter.categoryId)
    }

    if (filter.brandId) {
      productsToFilter = productsToFilter.filter((p) =>
        p.pro_tech_products_brands?.some((b) => b.pro_tech_brands.id === filter.brandId)
      )
    }

    if (filter.keywords) {
      productsToFilter = productsToFilter.filter((p) =>
        p.name.toLowerCase().includes((filter.keywords || '').toLowerCase())
      )
    }

    setFilteredProducts(productsToFilter)
  }

  useEffect(() => {
    setFilteredProducts(initialProducts)
  }, [initialProducts])
  return (
    <div className="space-y-10">
      <Filter onFilterUpdate={handleFilterUpdate} />
      {filteredProducts.length === 0 && <p className="text-center text-xl font-semibold">No products found</p>}
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}
