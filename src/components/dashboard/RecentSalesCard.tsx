import { BarChart3Icon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useLogistics } from '@/hooks/useLogistics'
import { useProducts } from '@/hooks/useProducts'
import { useMemo } from 'react'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { Link } from 'react-router'
import { NewSalesDialogForm } from '../sales/NewSalesDialog'

export function RecentSalesCard() {
  const { sales } = useLogistics()
  const { products } = useProducts()

  const recentSales = useMemo(
    () =>
      sales.length > 0
        ? sales
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 5)
        : [],
    [sales],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3Icon className="h-5 w-5 text-primary" />
          Vendas recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentSales.length > 0 ? (
          <div className="space-y-4">
            {recentSales.map((sale) => {
              const product = products.find((p) => p.id === sale.productId)
              return (
                <div
                  key={sale.id}
                  className="transaction-card sale-card"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {product?.name || 'Produto desconhecido'}
                    </h3>
                    <span className="text-success font-bold">
                      {formatCurrency(sale.totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                    <span>{formatDate(new Date(sale.createdAt))}</span>
                    <span>
                      {sale.quantity} {product?.unit} de:
                      {formatCurrency(sale.unitPrice)}
                    </span>
                  </div>
                </div>
              )
            })}
            <div className="text-center mt-4">
              <Link
                to="/sales"
                className="text-success hover:underline text-sm"
              >
                Visualizar todas as vendas
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Não há vendas realizadas ainda, adicione uma nova venda</p>
            <NewSalesDialogForm />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
