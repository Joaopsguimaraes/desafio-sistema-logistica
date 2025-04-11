import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'
import { BarChart3Icon } from 'lucide-react'
import { Card, CardDescription, CardHeader, CardTitle } from '../ui/card'

export function DashboardHeader() {
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
            <BarChart3Icon />
            Dashboard
          </CardTitle>
          <CardDescription>
            Visualize suas atividades e performances
          </CardDescription>
        </div>
      </CardHeader>
    </Card>
  )
}
