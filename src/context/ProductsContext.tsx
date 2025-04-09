import { Product } from '@/schemas/productSchema'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'
import { toast } from 'sonner'
import { useLogistics } from './LogisticsContext'
import { Purchase } from '@/schemas/purchaseSchema'

interface ProductsContextType {
  products: Product[]
  searchProductsTerms: string
  filteredProducts: Product[]
  addProduct: (product: Omit<Product, 'id'>) => void
  updateProduct: (id: string, product: Partial<Product>) => void
  deleteProduct: (id: string) => void
  searchProducts: (value: string) => void
  getProductById: (id: string) => Product | undefined
  getAvailablePurchasesForProduct: (productId: string) => Purchase[]
  getProductTotalAvailableQuantity: (productId: string) => number
}

const ProductsContext = createContext<ProductsContextType | undefined>(
  undefined,
)

export function ProductsProvider({ children }: PropsWithChildren) {
  const { purchases, sales } = useLogistics()
  const [products, setProducts] = useState<Product[]>(() => {
    const savedProducts = localStorage.getItem('products')
    return savedProducts ? JSON.parse(savedProducts) : []
  })

  const [searchProductsTerms, setSearchProductsTerms] = useState<string>('')

  const filteredProducts = useMemo(() => {
    return products.filter(
      (product) =>
        product.name
          .toLowerCase()
          .includes(searchProductsTerms.toLowerCase()) ||
        product.code.toLowerCase().includes(searchProductsTerms.toLowerCase()),
    )
  }, [products, searchProductsTerms])

  const addProduct = (product: Omit<Product, 'id'>) => {
    const newProduct = {
      ...product,
      id: crypto.randomUUID(),
    }
    setProducts((prev) => [...prev, newProduct])
    toast.success('Produto adicionado')
  }

  const updateProduct = (id: string, product: Partial<Product>) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...product } : p)),
    )
    toast.success('Product atualizado com sucesso')
  }

  const deleteProduct = (id: string) => {
    const hasReferences =
      purchases.some((p) => p.productId === id) ||
      sales.some((s) => s.productId === id)

    if (hasReferences) {
      toast.error('Não é possível deletar produto utilizado em transações')
      return
    }

    setProducts((prev) => prev.filter((p) => p.id !== id))
    toast.success('Produto deletado com sucesso')
  }

  const searchProducts = (value: string) => setSearchProductsTerms(value)

  const getProductById = (id: string) => {
    return products.find((p) => p.id === id)
  }

  const getAvailablePurchasesForProduct = (productId: string) => {
    return purchases
      .filter((p) => p.productId === productId && p.availableQuantity > 0)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }

  const getProductTotalAvailableQuantity = (productId: string) => {
    return purchases
      .filter((p) => p.productId === productId)
      .reduce((total, purchase) => total + purchase.availableQuantity, 0)
  }

  useEffect(() => {
    localStorage.setItem('products', JSON.stringify(products))
  }, [products])

  const value = {
    products,
    searchProductsTerms,
    filteredProducts,
    addProduct,
    updateProduct,
    deleteProduct,
    searchProducts,
    getProductById,
    getAvailablePurchasesForProduct,
    getProductTotalAvailableQuantity,
  }

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  )
}

export const useProducts = () => {
  const context = useContext(ProductsContext)

  if (context === undefined) {
    throw new Error('useProducts must be used within a ProductsProvider')
  }

  return context
}
