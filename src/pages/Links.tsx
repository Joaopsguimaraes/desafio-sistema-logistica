import { LinksHeader } from '@/components/links/LinksHeader'
import { ListProductsLinked } from '@/components/links/ListProductsLinked'
import { Badge } from '@/components/ui/badge'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLinksList } from '@/hooks/useLinksList'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { PackageSearch } from 'lucide-react'

export default function Links() {
  const { isLoading } = useLoadingAnimation()
  const { linksData } = useLinksList()

  return (
    <div className="space-y-6">
      <LinksHeader />

      {linksData.length > 0 ? (
        <div
          className={cn(
            'space-y-10 transform transition-all duration-500',
            isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
          )}
        >
          {linksData.map((productData) => (
            <div
              key={productData.productId}
              className="space-y-6"
            >
              <Card className="border-primary/10">
                <CardHeader className="bg-primary/5">
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{productData.productName}</CardTitle>
                      <CardDescription>
                        Unidade: {productData.productUnit}
                      </CardDescription>
                    </div>
                    <div className="flex gap-2">
                      <Badge
                        variant="outline"
                        className="bg-blue-50"
                      >
                        Compra: {productData.totalPurchasedQuantity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-green-50"
                      >
                        Disponível: {productData.totalAvailableQuantity}
                      </Badge>
                      <Badge
                        variant="outline"
                        className="bg-amber-50"
                      >
                        Vendida: {productData.totalSoldQuantity}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ListProductsLinked productData={productData} />
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Card>
          <CardHeader />
          <CardContent className="flex flex-col justify-center items-center">
            <PackageSearch className="size-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium mb-2">
              Não foram encontrado os vínculos
            </h3>
            <p className="text-muted-foreground mb-4">
              Comece a vincular as vendas com as compras!
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
