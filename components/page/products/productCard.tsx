import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Product } from '@/lib/types'
import Link from 'next/link'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

function InfoRow({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-sm font-medium">{label}:</p>
      {children}
    </div>
  )
}

export function ProductCard({ product }: ProductCardProps) {
  const allImages = [
    product.image || '/fallback-image.png',
    ...(product.gallery_images?.filter(Boolean) || []),
  ]

  return (
    <Card className="grid grid-cols-1 md:grid-cols-12 gap-4 p-0 rounded-none items-center overflow-hidden">
      {/* Image Section */}
      <div className="md:col-span-6 h-[300px] md:h-[400px] relative">
        <Carousel className="w-full h-full">
          <CarouselContent className="h-full">
            {allImages.map((url, index) => (
              <CarouselItem key={index} className="flex items-center justify-center">
                <div className="relative w-full h-[300px] md:h-[400px] overflow-hidden group">
                  <Image
                    src={url}
                    alt={`${product.name} image ${index + 1}`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority={index === 0} // preload first image
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {allImages.length > 1 && (
            <>
              <CarouselPrevious
                aria-label="Previous image"
                className="absolute left-2 top-1/2 -translate-y-1/2"
              />
              <CarouselNext
                aria-label="Next image"
                className="absolute right-2 top-1/2 -translate-y-1/2"
              />
            </>
          )}
        </Carousel>
      </div>

      {/* Info Section */}
      <CardContent className="md:col-span-6 p-6 md:p-10 flex flex-col justify-center gap-4">
        <h2 className="text-xl lg:text-2xl font-semibold">{product.name}</h2>

        <div className="space-y-3">
          {product?.pro_tech_products_brands?.length > 0 && (
            <InfoRow label="Brands">
              <div className="flex flex-wrap gap-2">
                {product.pro_tech_products_brands.map((item, index) => (
                  <span
                    key={index}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded-full font-bold"
                  >
                    {item.pro_tech_brands.name}
                  </span>
                ))}
              </div>
            </InfoRow>
          )}

          {product.category && (
            <InfoRow label="Category">
              <span className="bg-amber-100 text-amber-800 text-xs px-3 py-1 rounded font-medium">
                {product.category.name}
              </span>
            </InfoRow>
          )}

          {product.availability && (
            <InfoRow label="Availability">
              <span className="text-xs font-semibold bg-accent text-accent-foreground px-3 py-1 rounded w-fit">
                {product.availability}
              </span>
            </InfoRow>
          )}

          {product.part_number && (
            <InfoRow label="Part Number">
              <span className="text-xs font-medium bg-gray-200 text-gray-800 px-3 py-1 rounded truncate">
                {product.part_number}
              </span>
            </InfoRow>
          )}
        </div>

        <Link href={`/products/${product.slug}`} passHref>
          <Button className="px-10 w-fit">View Details</Button>
        </Link>
      </CardContent>
    </Card>
  )
}
