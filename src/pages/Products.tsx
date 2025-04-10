import { ListProducts } from '@/components/products/ListProducts'
import { ProductHeader } from '@/components/products/ProductHeader'

export default function Products() {
  return (
    <main className="space-y-4">
      <ProductHeader />
      <ListProducts />
    </main>
  )
}
