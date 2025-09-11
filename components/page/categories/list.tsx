import { getCategoriesWithBrands } from '@/service/categories'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppImage } from '@/components/appImage'

export default async function CategoriesList() {
  const categories = await getCategoriesWithBrands()
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="flex flex-col overflow-hidden pt-0">
          <div className="relative w-full h-[150px] flex items-center justify-center overflow-hidden rounded-t-lg">
            <AppImage
              src={category.image}
              alt={category.name}
              className="max-w-full max-h-full object-contain transition-transform duration-300 ease-in-out hover:scale-105"
            />
          </div>
          <CardContent className="flex-1">
            <p className="text-lg font-semibold">{category.name}</p>
            <p className="text-sm text-gray-600 mt-2 line-clamp-2">{category.description}</p>
            {category?.pro_tech_categories_brands?.length > 0 && (
              <div className="mt-2 flex items-center gap-3">
                <p className="text-sm font-semibold mb-1">Brands:</p>
                <div className="flex truncate gap-2">
                  {category.pro_tech_categories_brands.map((item) => (
                    <span
                      key={item.pro_tech_brands?.id}
                      className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full"
                    >
                      {item.pro_tech_brands?.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <Button className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
