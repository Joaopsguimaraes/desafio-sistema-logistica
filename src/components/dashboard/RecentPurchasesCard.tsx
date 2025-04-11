import { ShoppingCartIcon } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { useLogistics } from '@/hooks/useLogistics'
import { useMemo } from 'react'
import { useProducts } from '@/hooks/useProducts'
import { formatCurrency } from '@/utils/formatCurrency'
import { formatDate } from '@/utils/formatDate'
import { Link } from 'react-router'
import { NewPurchaseDialogForm } from '@/components/purchase/NewPurchaseDialogForm'

export function RecentPurchasesCard() {
  const { purchases } = useLogistics()
  const { products } = useProducts()

  const recentPurchases = useMemo(
    () =>
      purchases.length > 0
        ? purchases
            .sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime(),
            )
            .slice(0, 5)
        : [],
    [purchases],
  )

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCartIcon className="h-5 w-5 text-primary" />
          Compras recentes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentPurchases.length > 0 ? (
          <div className="space-y-4">
            {recentPurchases.map((purchase) => {
              const product = products.find((p) => p.id === purchase.productId)
              return (
                <div
                  key={purchase.id}
                  className="transaction-card purchase-card"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium">
                      {product?.name || 'Produto desconhecido'}
                    </h3>
                    <span className="text-primary font-bold">
                      {formatCurrency(purchase.unitPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-sm text-muted-foreground mt-1">
                    <span>{formatDate(new Date(purchase.createdAt))}</span>
                    <span>
                      {purchase.quantity} {product?.unit} de:
                      {formatCurrency(purchase.unitPrice)}
                    </span>
                  </div>
                </div>
              )
            })}
            <div className="text-center mt-4">
              <Link
                to="/purchase"
                className="text-primary hover:underline text-sm"
              >
                Visualizar todas as compras
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-muted-foreground">
            <p>Não foram realizadas compras ainda, adicione uma nova compra</p>
            <NewPurchaseDialogForm />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
