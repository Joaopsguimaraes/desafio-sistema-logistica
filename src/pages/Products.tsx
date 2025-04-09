import { ListProducts } from '@/components/products/ListProducts'
import { ProductHeader } from '@/components/products/ProductHeader'

export default function Products() {
  return (
    <main className="w-full flex flex-col gap-5">
      <ProductHeader />
      <ListProducts />
    </main>
  )
}
