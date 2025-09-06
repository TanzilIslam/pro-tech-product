import { getCategoriesWithBrands } from '@/service/categories'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppImage } from '@/components/appImage'

export default async function CategoriesList() {
  const categories = await getCategoriesWithBrands()
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {categories.map((category) => (
        <Card key={category.id} className="flex flex-col overflow-hidden pt-0">
          <div className="relative h-48 w-full">
            <AppImage
              src={category.image}
              alt={category.name}
              className="object-cover border-b rounded-t-lg rounded-b-none hover:scale-105 transition-transform ease-in-out duration-300"
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
