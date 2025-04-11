import { ListPurchase } from '@/components/purchase/ListPurchase'
import { PurchaseHeader } from '@/components/purchase/PurchaseHeader'

export default function Purchase() {
  return (
    <div className="space-y-4">
      <PurchaseHeader />
      <ListPurchase />
    </div>
  )
}
