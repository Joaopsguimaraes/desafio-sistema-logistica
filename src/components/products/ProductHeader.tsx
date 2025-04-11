import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { ProductDialogForm } from './ProductDialogForm'
import { cn } from '@/lib/utils'
import { Package2Icon } from 'lucide-react'

export function ProductHeader() {
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
            <Package2Icon />
            Produtos
          </CardTitle>
          <CardDescription>Gerencie o inventário de produtos</CardDescription>
        </div>
        <ProductDialogForm />
      </CardHeader>
    </Card>
  )
}
