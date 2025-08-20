import { getAllBrands } from '@/service/brands'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppImage } from '@/components/appImage'

export default async function BrandsList() {
  const brands = await getAllBrands()

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {brands.map((brand) => (
        <Card key={brand.id} className="flex flex-col overflow-hidden pt-0">
          <div className="relative h-48 w-full">
            <AppImage
              src={brand.image}
              alt={brand.name}
              className="object-cover border-b rounded-t-lg rounded-b-none hover:scale-105 transition-transform ease-in-out duration-300"
            />
          </div>
          <CardContent className="flex-1">
            <p className="text-lg font-semibold">{brand.name}</p>
            {brand.country && (
              <p className="text-sm text-gray-600 mt-2">
                Country: <span className="font-semibold">{brand.country}</span>
              </p>
            )}
            {brand?.factory_locations?.length && brand.factory_locations.length > 0 && (
              <p className="text-sm text-gray-600 mt-2 line-clamp-1">
                Factories:{' '}
                <span className="font-semibold">{brand.factory_locations.join(', ')}</span>
              </p>
            )}
            <Button className="w-full mt-4">View Details</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
