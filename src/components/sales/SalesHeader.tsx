import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { NewSalesDialogForm } from './NewSalesDialog'

export function SalesHeader() {
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
          <CardTitle className="text-xl">Vendas</CardTitle>
          <CardDescription>Gerencie suas vendas</CardDescription>
        </div>
        <NewSalesDialogForm />
      </CardHeader>
    </Card>
  )
}
