import { ProductsContext } from '@/context/ProductsContext'
import { useContext } from 'react'

export const useProducts = () => {
  const context = useContext(ProductsContext)

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context
}
