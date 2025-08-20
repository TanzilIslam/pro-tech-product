import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter,
  CardAction,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export function CardLoader({ numberOfCards }: { numberOfCards: number }) {
  const loaders = Array.from({ length: numberOfCards }) // render 4 placeholder cards
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {loaders.map((_, index) => (
        <Card key={index} className="flex flex-col animate-pulse overflow-hidden pt-0">
          {/* Image placeholder */}
          <div className="h-48 w-full bg-gray-200 rounded-t-md" />

          <CardHeader className="mt-2">
            <CardTitle className="h-5 w-3/4 bg-gray-200 rounded"></CardTitle>
          </CardHeader>

          <CardContent className="flex-1">
            <div className="h-4 w-1/2 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          </CardContent>

          <CardFooter>
            <CardAction className="w-full">
              <Button disabled className="w-full">
                Loading...
              </Button>
            </CardAction>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
