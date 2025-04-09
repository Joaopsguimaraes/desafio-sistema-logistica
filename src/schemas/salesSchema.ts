import { z } from 'zod'

const likedPurchasesSchema = z.object({
  purchaseId: z.string(),
  quantity: z.number(), // How much of the purchase is used in this sale
  unitPrice: z.number(), // Price from the purchase
  totalPrice: z.number(), // Calculated value
})

export const salesSchema = z.object({
  id: z.string(),
  date: z.string(),
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  notes: z.string().optional(),
  linkedPurchases: z.array(likedPurchasesSchema),
})

export type Sales = z.infer<typeof salesSchema>

export type LinkedPurchases = z.infer<typeof likedPurchasesSchema>
