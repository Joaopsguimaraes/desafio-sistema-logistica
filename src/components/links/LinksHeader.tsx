import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'

export function LinksHeader() {
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
          <CardTitle className="text-xl">Vínculos</CardTitle>
          <CardDescription>
            Veja o relacionamentos entre as compras e vendas
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
