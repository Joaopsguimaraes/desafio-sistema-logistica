import { DashboardHeader } from '@/components/dashboard/DashboardHeader'
import { RecentPurchasesCard } from '@/components/dashboard/RecentPurchasesCard'
import { RecentSalesCard } from '@/components/dashboard/RecentSalesCard'
import { StatusCard } from '@/components/dashboard/StatusCards'
import { useLoadingAnimation } from '@/hooks/useLoadingAnimation'
import { cn } from '@/lib/utils'

export default function Dashboard() {
  const { isLoading } = useLoadingAnimation()
  return (
    <div className="space-y-4">
      <DashboardHeader />
      <StatusCard />
      <div
        className={cn(
          'grid gap-6 md:grid-cols-2 transform transition-all duration-500',
          isLoading ? 'translate-y-4 opacity-0' : 'translate-y-0 opacity-100',
        )}
      >
        <RecentPurchasesCard />
        <RecentSalesCard />
      </div>
    </div>
  )
}
