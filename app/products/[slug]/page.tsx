import { getProductBySlug } from '@/service/products'
import { notFound } from 'next/navigation'
import { AppImage } from '@/components/appImage'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Badge } from '@/components/ui/badge'
import { Table, TableBody, TableCell, TableRow } from '@/components/ui/table'
import { ProductEnquiryForm } from '@/components/page/products/ProductEnquiryForm'

// Define the props that Next.js will pass to the page
interface ProductPageProps {
  params: {
    slug: string
  }
}

// This is an async Server Component
export default async function ProductDetailPage(props: ProductPageProps) {
  const { params } = await Promise.resolve(props)
  const product = await getProductBySlug(params.slug)

  // If no product is found for the given slug, show a 404 page
  if (!product) {
    notFound()
  }

  // Combine main and gallery images for the carousel
  const allImages = [product.image, ...(product.gallery_images || [])].filter(Boolean) as string[]

  if (allImages.length === 0) {
    allImages.push('/fallback-image.png')
  }

  return (
    <div className="">
      <div className="grid grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Image Gallery */}
        <div className="w-full col-span-12 md:col-span-6">
          <Carousel className="w-full">
            <CarouselContent>
              {allImages.map((imageUrl, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-square w-full">
                    <AppImage
                      src={imageUrl}
                      alt={`${product.name} - image ${index + 1}`}
                      className="object-contain"
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

        {/* Right Column: Product Details */}
        <div className="flex flex-col gap-2 col-span-12 md:col-span-6">
          {/* Product Name */}
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground">{product.name}</h1>
          {product.category && (
            <div className="flex items-center gap-4">
              <p>Category:</p>
              <p className="font-semibold">{product.category.name}</p>
            </div>
          )}

          {product.part_number && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <p className="">Part No:</p>
                <p className="font-semibold">{product.part_number}</p>
              </div>
            </div>
          )}

          {/* Availability */}
          {product.availability && (
            <div className="">
              <Badge variant="default">{product.availability}</Badge>
            </div>
          )}

          {product.pro_tech_products_brands?.length > 0 && (
            <>
              <p className="text-md font-medium">Available Brands:</p>
              <Carousel className="w-full">
                <CarouselContent>
                  {product.pro_tech_products_brands.map((brand) => (
                    <CarouselItem
                      key={brand.pro_tech_brands.id}
                      className="basis-1/1 sm:basis-1/2 md:basis-1/3 lg:basis-1/4 flex flex-col items-center"
                    >
                      <div className="relative h-[100px] w-full overflow-hidden border shadow">
                        <AppImage
                          src={brand.pro_tech_brands.image}
                          alt={brand.pro_tech_brands.name}
                          className="object-contain"
                        />
                      </div>
                      <span className="text-sm font-medium text-primary text-center">
                        {brand.pro_tech_brands.name}
                      </span>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                {product.pro_tech_products_brands.length > 1 && (
                  <>
                    <CarouselPrevious className="absolute left-2" />
                    <CarouselNext className="absolute right-2" />
                  </>
                )}
              </Carousel>
            </>
          )}

          {/* Description */}
          <div className="prose prose-sm lg:prose-base max-w-none mt-10">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p>No description available for this product.</p>
            )}
          </div>
        </div>
      </div>

      {/* Specifications Section (Full Width Below) */}
      <div className="grid grid-cols-12 gap-6 items-center h-full">
        <div className="col-span-12 md:col-span-6 mt-12 h-full">
          <ProductEnquiryForm productId={product.id} productName={product.name} />
        </div>
        {product.specifications && product.specifications.length > 0 && (
          <div className="col-span-12 md:col-span-6 mt-12 h-full border shadow p-8 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">Technical Specifications</h2>
            <Table>
              <TableBody>
                {product.specifications.map((spec, index) => (
                  <TableRow key={index} className="even:bg-muted/40 hover:bg-muted/80">
                    {/* Make the key column less wide and bolder */}
                    <TableCell className="font-semibold w-[20%] md:w-[30%]">{spec.key}</TableCell>
                    {/* Give the value column more space */}
                    <TableCell>{spec.value}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </div>
    </div>
  )
}
