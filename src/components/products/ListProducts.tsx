import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useProducts } from '@/context/ProductsContext'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { Edit2Icon, Package2Icon, Trash2Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { SearchProducts } from './SearchProducts'

export function ListProducts() {
  const { isLoading } = useLoadingAnimation()
  const { filteredProducts, searchProductsTerms, deleteProduct } = useProducts()

  return (
    <Card
      className={cn(
        'transform transition-all duration-500',
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <CardHeader>
        <CardTitle>Pesquisar</CardTitle>
        <SearchProducts />
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Nome</TableHead>
              <TableHead className="text-center">Código</TableHead>
              <TableHead className="text-right pr-8">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredProducts.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3}>
                  <div className="border rounded-lg p-8 text-center">
                    <Package2Icon className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium mb-2">
                      Não foram encontrados produtos
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {searchProductsTerms
                        ? 'Não foram encontrados produtos com esses critérios'
                        : 'Cadastre seu primeiro produto'}
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts.map((product) => (
                <TableRow key={product.id}>
                  <TableCell className="font-medium text-center">
                    {product.name}
                  </TableCell>
                  <TableCell className="text-center">{product.code}</TableCell>
                  <TableCell>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                      >
                        <Edit2Icon className="h-4 w-4" />
                        <span className="sr-only">Editar</span>
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => deleteProduct(product.id)}
                      >
                        <Trash2Icon className="h-4 w-4 text-destructive" />
                        <span className="sr-only">Deletar</span>
                      </Button>
                    </div>
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
