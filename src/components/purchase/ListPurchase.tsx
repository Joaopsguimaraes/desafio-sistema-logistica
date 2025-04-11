import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { Card, CardContent } from '../ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { FileInputIcon, Trash2Icon } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useLogistics } from '@/hooks/useLogistics'
import { useProducts } from '@/hooks/useProducts'
import { Button } from '../ui/button'

export function ListPurchase() {
  const { isLoading } = useLoadingAnimation()
  const { purchases, deletePurchase } = useLogistics()
  const { getProductById } = useProducts()

  return (
    <Card
      className={cn(
        'transform transition-all duration-500',
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Produto</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Preço</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Disponível</TableHead>
              <TableHead>Remover</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchases.length > 0 ? (
              purchases.map((purchase) => {
                const product = getProductById(purchase.productId)

                return (
                  <TableRow key={purchase.id}>
                    <TableCell className="font-medium">
                      {product?.name || 'Unknown'}
                    </TableCell>
                    <TableCell>{purchase.quantity}</TableCell>
                    <TableCell>${purchase.unitPrice.toFixed(2)}</TableCell>
                    <TableCell>${purchase.totalPrice.toFixed(2)}</TableCell>
                    <TableCell>
                      <span
                        className={
                          purchase.availableQuantity > 0
                            ? 'text-success'
                            : 'text-muted-foreground'
                        }
                      >
                        {purchase.availableQuantity}
                      </span>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deletePurchase(purchase.id!)}
                        disabled={
                          purchase.availableQuantity !== purchase.quantity
                        }
                      >
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Delete</span>
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            ) : (
              <TableRow>
                <TableCell colSpan={6}>
                  <div className="border rounded-lg p-8 text-center">
                    <FileInputIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Não foram encontrados compras
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Registre sua primeira compra
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
