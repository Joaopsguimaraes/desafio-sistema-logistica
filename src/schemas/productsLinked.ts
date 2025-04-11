import { z } from 'zod'

const purchaseLinks = z.object({
  purchaseId: z.string(),
  purchaseDate: z.date(),
  originalQuantity: z.number(),
  availableQuantity: z.number(),
  usedQuantity: z.number(),
  unitPrice: z.number(),
  linkedSales: z.array(
    z.object({
      saleId: z.string(),
      saleDate: z.date(),
      quantity: z.number(),
      unitPrice: z.number(),
    }),
  ),
})

export const productsLinkedSchema = z.object({
  productId: z.string(),
  productName: z.string(),
  productUnit: z.string(),
  totalPurchasedQuantity: z.number(),
  totalAvailableQuantity: z.number(),
  totalSoldQuantity: z.number(),
  totalLinkedQuantity: z.number(),
  purchaseLinks: z.array(purchaseLinks),
})

export type ProductLinked = z.infer<typeof productsLinkedSchema>
