/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useLogistics } from '@/hooks/useLogistics'
import { useProducts } from '@/hooks/useProducts'
import { Sales } from '@/schemas/salesSchema'
import { createContext, PropsWithChildren, useState } from 'react'
import { toast } from 'sonner'

type LinkedPurchase = {
  purchaseId: string
  quantity: number
  unitPrice: number
}

type LinkedFieldsType = 'purchaseId' | 'unitPrice' | 'quantity'

interface LinkedContextProps {
  linkedPurchases: LinkedPurchase[]
  isOpenLinkDialog: boolean
  setIsOpenLinkDialog: (value: boolean) => void
  openLinkDialogWithId: (saleId: string) => void
  currentSale: Sales | null
  onLinkSubmit: (e: React.FormEvent) => void
  onLinkedPurchaseChange: (
    index: number,
    field: LinkedFieldsType,
    value: any,
  ) => void
  onAddLinkedPurchase: () => void
  onRemoveLinkedPurchase: (index: number) => void
}

export const LinkedContext = createContext<LinkedContextProps | undefined>(
  undefined,
)

export function LinkedProvider({ children }: PropsWithChildren) {
  const { sales, linkSaleToPurchases } = useLogistics()
  const { getAvailablePurchasesForProduct } = useProducts()
  const [linkedPurchases, setLinkedPurchases] = useState<LinkedPurchase[]>([])
  const [isOpenLinkDialog, setIsOpenLinkDialog] = useState(false)
  const [currentSale, setCurrentSale] = useState<Sales | null>(null)

  const openLinkDialogWithId = (saleId: string) => {
    const sale = sales.find((s) => s.id === saleId)
    if (!sale) return

    setCurrentSale(sale)

    setLinkedPurchases(
      sale.linkedPurchases.map((lp) => ({
        purchaseId: lp.purchaseId,
        quantity: lp.quantity,
        unitPrice:
          typeof lp.unitPrice === 'number'
            ? lp.unitPrice
            : parseFloat(lp.unitPrice as unknown as string),
      })),
    )

    setIsOpenLinkDialog(true)
  }

  const onLinkSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!currentSale) return

    try {
      const processedLinkedPurchases = linkedPurchases.map((lp) => ({
        ...lp,
        unitPrice:
          typeof lp.unitPrice === 'number'
            ? lp.unitPrice
            : parseFloat(lp.unitPrice as unknown as string),
      }))

      linkSaleToPurchases(currentSale.id!, processedLinkedPurchases)
      setIsOpenLinkDialog(false)
      setCurrentSale(null)
      setLinkedPurchases([])
    } catch (error) {
      toast.error(`Error: ${(error as Error).message}`)
    }
  }

  const onLinkedPurchaseChange = (index: number, field: string, value: any) => {
    setLinkedPurchases((prev) =>
      prev.map((lp, i) =>
        i === index
          ? { ...lp, [field]: field === 'unitPrice' ? Number(value) : value }
          : lp,
      ),
    )
  }

  const onAddLinkedPurchase = () => {
    if (!currentSale) return

    const sale = sales.find((s) => s.id === currentSale.id)
    if (!sale) return

    const availablePurchases = getAvailablePurchasesForProduct(sale.productId)
    if (availablePurchases.length === 0) {
      toast.error('No available purchases to link')
      return
    }

    // Calculate currently linked quantity
    const currentlyLinkedQuantity = linkedPurchases.reduce(
      (acc, lp) => acc + lp.quantity,
      0,
    )

    // Check if sale is fully linked
    if (currentlyLinkedQuantity >= sale.quantity) {
      toast.error('Sale is already fully linked to purchases')
      return
    }

    // Add a new empty link with unitPrice as a number
    setLinkedPurchases([
      ...linkedPurchases,
      {
        purchaseId: availablePurchases[0].id,
        quantity: 0,
        unitPrice: availablePurchases[0].unitPrice,
      },
    ])
  }

  const onRemoveLinkedPurchase = (index: number) => {
    setLinkedPurchases(linkedPurchases.filter((_, i) => i !== index))
  }

  const values = {
    linkedPurchases,
    setLinkedPurchases,
    isOpenLinkDialog,
    setIsOpenLinkDialog,
    currentSale,
    openLinkDialogWithId,
    onLinkSubmit,
    onLinkedPurchaseChange,
    onAddLinkedPurchase,
    onRemoveLinkedPurchase,
  }
  return (
    <LinkedContext.Provider value={values}>{children}</LinkedContext.Provider>
  )
}
