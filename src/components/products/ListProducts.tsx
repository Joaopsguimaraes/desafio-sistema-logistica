import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { Package2Icon, Trash2Icon } from 'lucide-react'
import { Card, CardContent, CardHeader } from '../ui/card'
import { useProducts } from '@/hooks/useProducts'

export function ListProducts() {
  const { isLoading } = useLoadingAnimation()
  const { products, deleteProduct } = useProducts()

  return (
    <Card
      className={cn(
        'transform transition-all duration-500',
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <CardHeader></CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Unidade</TableHead>
              <TableHead className="text-center">Deletar</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="border rounded-lg p-8 text-center">
                    <Package2Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Não foram encontrados produtos
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Realize o primeiro cadastro
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              products.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-center">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-center">{product.unit}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => deleteProduct(product.id!)}
                    >
                      <Trash2Icon className="h-4 w-4 text-destructive" />
                      <span className="sr-only">Deletar</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
