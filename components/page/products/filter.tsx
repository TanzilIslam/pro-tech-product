'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'
import { getAllCategories } from '@/service/categories'
import { getAllBrands } from '@/service/brands'
import { Category, Brand } from '@/lib/types'

type FilterState = {
  categoryId?: string
  brandId?: string
  keywords?: string
}

export function Filter({ onFilterUpdate }: { onFilterUpdate: (filter: FilterState) => void }) {
  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])

  const [selectedCategory, setSelectedCategory] = useState<'all' | string>('all')
  const [selectedBrand, setSelectedBrand] = useState<'all' | string>('all')
  const [keywords, setKeywords] = useState('')

  // Fetch categories and brands once
  useEffect(() => {
    const fetchData = async () => {
      const [categoriesRes, brandsRes] = await Promise.all([getAllCategories(), getAllBrands()])
      setCategories(categoriesRes || [])
      setBrands(brandsRes || [])
    }
    fetchData()
  }, [])

  // Debounced keyword effect
  useEffect(() => {
    const timeout = setTimeout(() => {
      onFilterUpdate({
        categoryId: selectedCategory === 'all' ? undefined : selectedCategory,
        brandId: selectedBrand === 'all' ? undefined : selectedBrand,
        keywords: keywords.trim() || undefined,
      })
    }, 400)
    return () => clearTimeout(timeout)
  }, [selectedCategory, selectedBrand, keywords, onFilterUpdate])

  const handleCategoryChange = useCallback(
    (value: 'all' | string) => setSelectedCategory(value),
    []
  )
  const handleBrandChange = useCallback((value: 'all' | string) => setSelectedBrand(value), [])
  const handleKeywordsChange = useCallback((value: string) => setKeywords(value), [])
  const handleReset = useCallback(() => {
    setSelectedCategory('all')
    setSelectedBrand('all')
    setKeywords('')
    onFilterUpdate({})
  }, [onFilterUpdate])

  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      {/* Search */}
      <div className="col-span-5">
        <Input
          placeholder="Search products..."
          value={keywords}
          onChange={(e) => handleKeywordsChange(e.target.value)}
          className="!h-14"
        />
      </div>

      {/* Filters */}
      <div className="col-span-7">
        <div className="grid grid-cols-12 gap-4 items-center">
          {/* Category */}
          <div className="col-span-5">
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-full !h-14">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="max-h-96 overflow-y-auto">
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={cat.id} className="flex items-center gap-2 py-2">
                    <img src={cat.image} alt={cat.name} className="w-8 h-8 object-contain" />
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Brand */}
          <div className="col-span-5">
            <Select value={selectedBrand} onValueChange={handleBrandChange}>
              <SelectTrigger className="w-full !h-14">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent className="max-h-96 overflow-y-auto">
                <SelectItem value="all">All Brands</SelectItem>
                {brands.map((brand) => (
                  <SelectItem
                    key={brand.id}
                    value={brand.id}
                    className="flex items-center gap-2 py-2"
                  >
                    <img src={brand.image} alt={brand.name} className="w-8 h-8 object-contain" />
                    {brand.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Reset */}
          <Button variant="outline" className="col-span-2 w-full h-14" onClick={handleReset}>
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
