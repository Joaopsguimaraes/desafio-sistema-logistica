import { useMemo } from 'react'
import { useLogistics } from './useLogistics'
import { useProducts } from './useProducts'
import { ProductLinked } from '@/schemas/productsLinked'

export function useLinksList() {
  const { purchases, sales } = useLogistics()
  const { getProductById } = useProducts()

  const linksData = useMemo(() => {
    const productMap = new Map<string, ProductLinked>()

    purchases.forEach((purchase) => {
      const product = getProductById(purchase.productId)
      if (!product) return

      if (!productMap.has(product.id!)) {
        productMap.set(product.id!, {
          productId: product.id!,
          productName: product.name,
          productUnit: product.unit,
          totalPurchasedQuantity: 0,
          totalAvailableQuantity: 0,
          totalSoldQuantity: 0,
          totalLinkedQuantity: 0,
          purchaseLinks: [],
        })
      }

      const productData = productMap.get(product.id!)!

      productData.totalPurchasedQuantity += purchase.quantity
      productData.totalAvailableQuantity += purchase.availableQuantity

      const usedQuantity = purchase.quantity - purchase.availableQuantity

      productData.purchaseLinks.push({
        purchaseId: purchase.id!,
        purchaseDate: purchase.createdAt,
        originalQuantity: purchase.quantity,
        availableQuantity: purchase.availableQuantity,
        usedQuantity: usedQuantity,
        unitPrice: purchase.unitPrice,
        linkedSales: [],
      })
    })

    sales.forEach((sale) => {
      const product = getProductById(sale.productId)
      if (!product) return

      if (!productMap.has(product.id!)) {
        return
      }

      const productData = productMap.get(product.id!)!
      productData.totalSoldQuantity += sale.quantity

      sale.linkedPurchases.forEach((link) => {
        productData.totalLinkedQuantity += link.quantity

        const purchaseLink = productData.purchaseLinks.find(
          (p) => p.purchaseId === link.purchaseId,
        )
        if (purchaseLink) {
          purchaseLink.linkedSales.push({
            saleId: sale.id!,
            saleDate: sale.createdAt,
            quantity: link.quantity,
            unitPrice: link.unitPrice,
          })
        }
      })
    })

    return Array.from(productMap.values())
  }, [purchases, sales, getProductById])

  return {
    linksData,
  }
}
