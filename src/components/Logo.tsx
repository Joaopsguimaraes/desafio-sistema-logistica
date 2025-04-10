import { Package, Truck } from 'lucide-react'

export function Logo() {
  return (
    <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-600 text-white">
      <div className="relative">
        <Truck className="h-5 w-5" />
        <Package className="absolute -bottom-1 -right-1 h-3 w-3" />
      </div>
    </div>
  )
}
