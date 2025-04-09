import { SearchIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { useLogistics } from '@/context/LogisticsContext'

export function SearchProducts() {
  const { searchProductsTerms, searchProducts } = useLogistics()

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    searchProducts(e.target.value)
  }

  return (
    <div className="flex items-center space-x-2">
      <div className="relative flex-1">
        <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Pesquise os produtos..."
          className="pl-8"
          value={searchProductsTerms}
          onChange={onChange}
        />
      </div>
    </div>
  )
}
