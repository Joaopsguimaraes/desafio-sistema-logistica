import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { FileOutputIcon, LinkIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { LinkSaleDialog } from './LinkSaleDialog'
import { useLogistics } from '@/hooks/useLogistics'
import { useProducts } from '@/hooks/useProducts'
import { useLinked } from '@/hooks/useLinked'
import { Badge } from '../ui/badge'
import { formatCurrency } from '@/utils/formatCurrency'

export function ListSales() {
  const { isLoading } = useLoadingAnimation()
  const { sales } = useLogistics()
  const { getProductById } = useProducts()
  const { openLinkDialogWithId } = useLinked()

  return (
    <>
      <Card
        className={cn(
          'transform transition-all duration-500',
          isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
        )}
      >
        <CardHeader className="bg-primary/5" />
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Produto</TableHead>
                <TableHead className="text-center">Quantidade</TableHead>
                <TableHead className="text-center">Preço</TableHead>
                <TableHead className="text-center">Total</TableHead>
                <TableHead className="text-center">Vinculado</TableHead>
                <TableHead className="text-center">Vincular</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sales.length > 0 ? (
                sales.map((sale) => {
                  const product = getProductById(sale.productId)
                  const linkedQuantity = sale.linkedPurchases.reduce(
                    (acc, lp) => acc + lp.quantity,
                    0,
                  )
                  const linkStatus =
                    linkedQuantity === 0
                      ? 'Não vinculada'
                      : linkedQuantity < sale.quantity
                      ? 'Vinculada parcialmente'
                      : 'Vinculada'
                  const linkStatusClass =
                    linkedQuantity === 0
                      ? 'text-muted-foreground'
                      : linkedQuantity < sale.quantity
                      ? 'text-warning'
                      : 'text-success'

                  return (
                    <TableRow key={sale.id}>
                      <TableCell className="font-medium">
                        {product?.name || 'Unknown'}
                      </TableCell>
                      <TableCell className="text-center">
                        <Badge variant={'secondary'}>{sale.quantity}</Badge>
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof sale.unitPrice === 'number'
                          ? formatCurrency(sale.unitPrice)
                          : formatCurrency(0)}
                      </TableCell>
                      <TableCell className="text-center">
                        {typeof sale.totalPrice === 'number'
                          ? formatCurrency(sale.totalPrice)
                          : formatCurrency(0)}
                      </TableCell>
                      <TableCell className="text-center">
                        <span className={linkStatusClass}>
                          {linkStatus} ({linkedQuantity}/{sale.quantity})
                        </span>
                      </TableCell>
                      <TableCell className="text-center">
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => openLinkDialogWithId(sale.id!)}
                        >
                          <LinkIcon className="h-4 w-4 text-primary" />
                          <span className="sr-only">Vincular</span>
                        </Button>
                      </TableCell>
                    </TableRow>
                  )
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <div className="border rounded-lg p-8 text-center">
                      <FileOutputIcon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <h3 className="text-lg font-medium mb-2">
                        Não foram encontrados vendas
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        Realize a primeira venda
                      </p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      <LinkSaleDialog />
    </>
  )
}
