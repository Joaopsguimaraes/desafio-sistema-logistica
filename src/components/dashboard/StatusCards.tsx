import { Link } from 'react-router'
import { Card, CardContent } from '../ui/card'
import { useLogistics } from '@/hooks/useLogistics'
import { useProducts } from '@/hooks/useProducts'
import { useMemo } from 'react'
import { BarChart3Icon, Package2Icon, ShoppingCartIcon } from 'lucide-react'
import { formatCurrency } from '@/utils/formatCurrency'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'

export function StatusCard() {
  const { isLoading } = useLoadingAnimation()
  const { purchases, sales } = useLogistics()
  const { products } = useProducts()

  const totalProducts = products.length

  const totalPurchases = useMemo(
    () => purchases.reduce((sum, purchase) => sum + purchase.totalPrice, 0),
    [purchases],
  )

  const totalSales = useMemo(
    () => sales.reduce((sum, sale) => sum + sale.totalPrice, 0),
    [sales],
  )

  return (
    <div
      className={cn(
        'grid gap-4 md:grid-cols-2 lg:grid-cols-3 transform transition-all duration-500',
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <CustomCard
        title="Total dos produtos"
        value={totalProducts.toString()}
        icon={<Package2Icon className="size-5" />}
        to="/products"
        description="Inventário de produtos"
      />
      <CustomCard
        title="Total das compras"
        value={formatCurrency(totalPurchases)}
        icon={<ShoppingCartIcon className="size-5" />}
        to="/purchase"
        description="Custo das compras"
      />
      <CustomCard
        title="Total das vendas"
        value={formatCurrency(totalSales)}
        icon={<BarChart3Icon className="size-5" />}
        to="/sales"
        description="Total das vendas"
      />
    </div>
  )
}

interface CustomCardProps {
  title: string
  value: string
  icon: React.ReactNode
  to: string
  description: string
}

function CustomCard({ title, value, icon, to, description }: CustomCardProps) {
  return (
    <Link to={to}>
      <Card
        className={`bg-primary/5 border-primary hover:shadow-md transition-shadow`}
      >
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium">{title}</p>
              <h2 className="text-2xl font-bold mt-1">{value}</h2>
              <p className="text-xs text-muted-foreground mt-1">
                {description}
              </p>
            </div>
            <div className={`text-primary p-2 rounded-full `}>{icon}</div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
