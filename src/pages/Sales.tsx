import { ListSales } from '@/components/sales/ListSales'
import { SalesHeader } from '@/components/sales/SalesHeader'

export default function Sales() {
  return (
    <main className="space-y-4">
      <SalesHeader />
      <ListSales />
    </main>
  )
}
