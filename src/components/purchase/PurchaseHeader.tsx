import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { NewPurchaseDialogForm } from './NewPurchaseDialogForm'
import { ShoppingCartIcon } from 'lucide-react'

export function PurchaseHeader() {
  const { isLoading } = useLoadingAnimation()

  return (
    <Card
      className={cn(
        'transform transition-all duration-500',
        isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
      )}
    >
      <CardHeader className="flex flex-row">
        <div className="flex flex-col justify-center gap-1 w-full">
          <CardTitle className="text-xl inline-flex gap-2 text-primary">
            <ShoppingCartIcon />
            Compras
          </CardTitle>
          <CardDescription>Gerencie as compras dos produtos</CardDescription>
        </div>
        <NewPurchaseDialogForm />
      </CardHeader>
    </Card>
  )
}
