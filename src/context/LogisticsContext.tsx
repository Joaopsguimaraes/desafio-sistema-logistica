import { Purchase } from '@/schemas/purchaseSchema'
import { LinkedPurchases, Sales } from '@/schemas/salesSchema'
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from 'react'
import { toast } from 'sonner'

interface LogisticsContextType {
  purchases: Purchase[]
  sales: Sales[]
  addPurchase: (purchase: Omit<Purchase, 'id' | 'availableQuantity'>) => void
  updatePurchase: (id: string, purchase: Partial<Purchase>) => void
  deletePurchase: (id: string) => void
  addSale: (sale: Omit<Sales, 'id' | 'linkedPurchases'>) => void
  updateSale: (id: string, sale: Partial<Sales>) => void
  deleteSale: (id: string) => void
  linkSaleToPurchases: (
    saleId: string,
    linkedPurchases: Omit<LinkedPurchases, 'totalPrice'>[],
  ) => void
}

const LogisticsContext = createContext<LogisticsContextType | undefined>(
  undefined,
)

export function LogisticsProvider({ children }: PropsWithChildren) {
  const [purchases, setPurchases] = useState<Purchase[]>(() => {
    const savedPurchases = localStorage.getItem('purchases')
    return savedPurchases ? JSON.parse(savedPurchases) : []
  })

  const [sales, setSales] = useState<Sales[]>(() => {
    const savedSales = localStorage.getItem('sales')
    return savedSales ? JSON.parse(savedSales) : []
  })

  useEffect(() => {
    localStorage.setItem('purchases', JSON.stringify(purchases))
  }, [purchases])

  useEffect(() => {
    localStorage.setItem('sales', JSON.stringify(sales))
  }, [sales])

  const addPurchase = (
    purchase: Omit<Purchase, 'id' | 'availableQuantity'>,
  ) => {
    const newPurchase = {
      ...purchase,
      id: crypto.randomUUID(),
      availableQuantity: purchase.quantity,
    }
    setPurchases((prev) => [...prev, newPurchase])
    toast.success('Compra adicionada com sucesso!')
  }

  const updatePurchase = (id: string, purchase: Partial<Purchase>) => {
    const existingPurchase = purchases.find((p) => p.id === id)
    if (!existingPurchase) {
      toast.error('Compra não encontrada')
      return
    }

    const usedQuantity =
      existingPurchase.quantity - existingPurchase.availableQuantity

    let newAvailableQuantity = existingPurchase.availableQuantity
    if (purchase.quantity !== undefined && purchase.quantity >= usedQuantity) {
      newAvailableQuantity = purchase.quantity - usedQuantity
    } else if (
      purchase.quantity !== undefined &&
      purchase.quantity < usedQuantity
    ) {
      toast.error(
        'Não é possível reduzir quantidade que ja foi utilizada em venda!',
      )
      return
    }

    setPurchases((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              ...purchase,
              availableQuantity: newAvailableQuantity,
            }
          : p,
      ),
    )
    toast.success('Compra atualizada')
  }

  const deletePurchase = (id: string) => {
    const isLinked = sales.some((sale) =>
      sale.linkedPurchases.some((lp) => lp.purchaseId === id),
    )

    if (isLinked) {
      toast.error('Não pode deletar uma compra que foi utilizada em uma venda')
      return
    }

    setPurchases((prev) => prev.filter((p) => p.id !== id))
    toast.success('Compra deletada com sucesso')
  }

  const addSale = (sale: Omit<Sales, 'id' | 'linkedPurchases'>) => {
    const newSale = {
      ...sale,
      id: crypto.randomUUID(),
      linkedPurchases: [],
    }

    setSales((prev) => [...prev, newSale])
    toast.success('Sale added successfully')
  }

  const updateSale = (id: string, sale: Partial<Sales>) => {
    const existingSale = sales.find((s) => s.id === id)

    if (!existingSale) {
      toast.error('Venda não encontrada')
      return
    }

    if (
      sale.quantity !== undefined &&
      existingSale.linkedPurchases.length > 0 &&
      sale.quantity <
        existingSale.linkedPurchases.reduce((acc, lp) => acc + lp.quantity, 0)
    ) {
      toast.error('Não pode reduzir quantidades que ja foram utilizadas')
      return
    }

    setSales((prev) => prev.map((s) => (s.id === id ? { ...s, ...sale } : s)))
    toast.success('Venda atualizada com sucesso')
  }

  const deleteSale = (id: string) => {
    const saleToDelete = sales.find((s) => s.id === id)
    if (!saleToDelete) {
      toast.error('Venda não encontrada')
      return
    }

    if (saleToDelete.linkedPurchases.length > 0) {
      setPurchases((prev) =>
        prev.map((purchase) => {
          const linkedPurchase = saleToDelete.linkedPurchases.find(
            (lp) => lp.purchaseId === purchase.id,
          )
          if (linkedPurchase) {
            return {
              ...purchase,
              availableQuantity:
                purchase.availableQuantity + linkedPurchase.quantity,
            }
          }
          return purchase
        }),
      )
    }

    setSales((prev) => prev.filter((s) => s.id !== id))
    toast.success('Venda deletada com sucesso')
  }

  const linkSaleToPurchases = (
    saleId: string,
    linkedPurchases: Omit<LinkedPurchases, 'totalPrice'>[],
  ) => {
    const sale = sales.find((s) => s.id === saleId)

    if (!sale) {
      toast.error('Venda não encontrada')
      return
    }

    const totalLinkedQuantity = linkedPurchases.reduce(
      (acc, lp) => acc + lp.quantity,
      0,
    )
    if (totalLinkedQuantity > sale.quantity) {
      toast.error('A quantidade total vinculada excede a quantidade de venda')
      return
    }

    const completedLinkedPurchases = linkedPurchases.map((lp) => ({
      ...lp,
      totalPrice: lp.quantity * lp.unitPrice,
    }))

    setPurchases((prev) =>
      prev.map((purchase) => {
        const linkedPurchase = linkedPurchases.find(
          (lp) => lp.purchaseId === purchase.id,
        )
        if (linkedPurchase) {
          if (linkedPurchase.quantity > purchase.availableQuantity) {
            throw new Error(
              `Not enough available quantity for purchase ID ${purchase.id}`,
            )
          }
          return {
            ...purchase,
            availableQuantity:
              purchase.availableQuantity - linkedPurchase.quantity,
          }
        }
        return purchase
      }),
    )

    setSales((prev) =>
      prev.map((s) =>
        s.id === saleId
          ? {
              ...s,
              linkedPurchases: completedLinkedPurchases,
            }
          : s,
      ),
    )

    toast.success('Venda vinculada com sucesso')
  }

  const value = {
    purchases,
    sales,
    addPurchase,
    updatePurchase,
    deletePurchase,
    addSale,
    updateSale,
    deleteSale,
    linkSaleToPurchases,
  }

  return (
    <LogisticsContext.Provider value={value}>
      {children}
    </LogisticsContext.Provider>
  )
}

export const useLogistics = () => {
  const context = useContext(LogisticsContext)
  if (context === undefined) {
    throw new Error('useLogistics must be used within a LogisticsProvider')
  }
  return context
}
