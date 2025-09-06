import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AppImage } from '@/components/appImage'
import { Product } from '@/lib/types'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const allImages: string[] = [
    product.image || '/fallback-image.png',
    ...(product.gallery_images || []),
  ]

  return (
    <Card className="grid grid-cols-1 md:grid-cols-12 gap-4 p-0 rounded-none items-center overflow-hidden">
      <div className="md:col-span-6 h-[300px] md:h-[400px] relative">
        <Carousel className="w-full">
          <CarouselContent className="h-[400px]">
            {allImages.map((imageUrl, index) => (
              <CarouselItem key={index} className="h-full">
                <div className="relative w-full h-full p-1 flex items-center justify-center">
                  <AppImage
                    src={imageUrl}
                    alt={`${product.name} - image ${index + 1}`}
                    className="w-full h-full object-contain"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {allImages.length > 1 && (
            <>
              <CarouselPrevious className="absolute left-2" />
              <CarouselNext className="absolute right-2" />
            </>
          )}
        </Carousel>
      </div>

      <CardContent className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center">
        <h2 className="text-xl lg:text-2xl font-semibold mb-4">{product.name}</h2>
        <div className="space-y-3">
          {product?.pro_tech_products_brands?.length > 0 && (
            <div className="mt-2 flex items-center gap-3">
              <p className="text-sm font-semibold mb-1">Brands:</p>
              <div className="flex truncate gap-2">
                {product.pro_tech_products_brands.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full font-bold"
                  >
                    {item.pro_tech_brands.name}
                  </span>
                ))}
              </div>
            </div>
          )}

          {product.category && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Category:</p>
              <span className="font-medium bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded">
                {product.category.name}
              </span>
            </div>
          )}

          {product.availability && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Availability:</p>
              <span className="text-xs font-semibold bg-accent text-accent-foreground px-3 py-1 rounded w-fit">
                {product.availability}
              </span>
            </div>
          )}

          {product.part_number && (
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium">Part Number:</p>
              <span className="text-xs font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded w-fit truncate">
                {product.part_number}
              </span>
            </div>
          )}
        </div>
        <Link href={`/products/${product.id}`} passHref>
          <Button className="px-10 mt-6 w-fit">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
