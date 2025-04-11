import { ProductLinked } from '@/schemas/productsLinked'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table'
import { FileTextIcon } from 'lucide-react'

interface Props {
  productData: ProductLinked
}

export function ListProductsLinked({ productData }: Props) {
  return (
    <div className="space-y-8">
      {productData.purchaseLinks.map((purchase) => (
        <div
          key={purchase.purchaseId}
          className="border rounded-md overflow-hidden"
        >
          <div className="bg-muted/30 px-4 py-3 flex flex-wrap justify-between items-center gap-2">
            <div>
              <h3 className="font-medium">
                Compra: {formatDate(new Date(purchase.purchaseDate))}
              </h3>
              <p className="text-sm text-muted-foreground">
                ID: {purchase.purchaseId.substring(0, 8)}...
              </p>
            </div>
            <div className="flex gap-3">
              <div className="text-sm">
                <span className="text-muted-foreground">
                  Quantidade original:{' '}
                </span>
                <span className="font-medium">{purchase.originalQuantity}</span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Usada: </span>
                <span className="font-medium text-amber-600">
                  {purchase.usedQuantity}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Disponível: </span>
                <span className="font-medium text-green-600">
                  {purchase.availableQuantity}
                </span>
              </div>
              <div className="text-sm">
                <span className="text-muted-foreground">Preço unitário: </span>
                <span className="font-medium">
                  {formatCurrency(purchase.unitPrice)}
                </span>
              </div>
            </div>
          </div>

          {purchase.linkedSales.length > 0 ? (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-center">Vendido em</TableHead>
                  <TableHead className="text-center">ID da venda</TableHead>
                  <TableHead className="text-center">Quantidade</TableHead>
                  <TableHead className="text-center">Valor</TableHead>
                  <TableHead className="text-center">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchase.linkedSales.map((sale, i) => (
                  <TableRow key={`${purchase.purchaseId}-${sale.saleId}-${i}`}>
                    <TableCell className="text-center">
                      {formatDate(new Date(sale.saleDate))}
                    </TableCell>
                    <TableCell className="font-mono text-center text-xs">
                      {sale.saleId.substring(0, 8)}...
                    </TableCell>
                    <TableCell className="text-center">
                      {sale.quantity}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(sale.unitPrice)}
                    </TableCell>
                    <TableCell className="text-center">
                      {formatCurrency(sale.quantity * sale.unitPrice)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <div className="px-4 py-6 text-center text-muted-foreground">
              <FileTextIcon className="h-8 w-8 mx-auto mb-2 opacity-30" />
              <p>Nenhuma venda vinculada a essa compra ainda</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
