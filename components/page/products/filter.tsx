/* eslint-disable @next/next/no-img-element */
'use client'
import { useState, useEffect } from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { getAllCategories } from '@/service/categories'
import { Category, Brand } from '@/lib/types'
import { getAllBrands } from '@/service/brands'
import { Button } from '@/components/ui/button'
import { RotateCcw } from 'lucide-react'

export function Filter({
  onFilterUpdate,
}: {
  onFilterUpdate: (filter: { categoryId?: string; brandId?: string; keywords?: string }) => void
}) {
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(undefined)
  const [selectedBrand, setSelectedBrand] = useState<string | undefined>(undefined)

  const [categories, setCategories] = useState<Category[]>([])
  const [brands, setBrands] = useState<Brand[]>([])
  const [keywords, setKeywords] = useState('')

  const fetchAllCategories = async () => {
    const categories = await getAllCategories()
    setCategories(categories || [])
  }

  const fetchAllBrands = async () => {
    const brands = await getAllBrands()
    setBrands(brands || [])
  }

  useEffect(() => {
    fetchAllCategories()
    fetchAllBrands()
  }, [])

  return (
    <div className="grid grid-cols-12 gap-4 items-center">
      <div className="col-span-5">
        <Input
          placeholder="Search products..."
          value={keywords}
          onChange={(e) => {
            setKeywords(e.target.value)
            onFilterUpdate({ keywords: e.target.value })
          }}
          className="!h-14"
        />
      </div>
      <div className="col-span-7">
        <div className="grid grid-cols-12 gap-4 items-center">
          <div className="col-span-5">
            <Select
              value={selectedCategory}
              onValueChange={(value) => {
                setSelectedCategory(value)
                onFilterUpdate({ categoryId: value })
              }}
            >
              <SelectTrigger className="w-full !h-14">
                <SelectValue placeholder="Select Category" />
              </SelectTrigger>
              <SelectContent className="max-h-96 overflow-y-auto">
                {categories.map((category) => (
                  <SelectItem
                    key={category.id}
                    value={category.id}
                    className="flex flex-wrap items-center gap-4 py-2"
                  >
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-10 h-10 object-contain"
                    />
                    <p className="truncate">{category.name}</p>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-5">
            <Select
              value={selectedBrand}
              onValueChange={(value) => {
                setSelectedBrand(value)
                onFilterUpdate({ brandId: value })
              }}
            >
              <SelectTrigger className="w-full !h-14">
                <SelectValue placeholder="Select Brand" />
              </SelectTrigger>
              <SelectContent className="max-h-96 overflow-y-auto">
                {brands.map((brand) => (
                  <SelectItem
                    key={brand.id}
                    value={brand.id}
                    className="py-2 flex items-center gap-2"
                  >
                    <img src={brand.image} alt={brand.name} className="w-10 h-10 object-contain" />
                    <span className="truncate whitespace-nowrap">{brand.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button
            variant="outline"
            className="col-span-2 w-full h-14"
            onClick={() => {
              setSelectedCategory(undefined)
              setSelectedBrand(undefined)
              setKeywords('')
              onFilterUpdate({})
            }}
          >
            <RotateCcw className="h-4 w-4" />
            Reset Filters
          </Button>
        </div>
      </div>
    </div>
  )
}
