import { z } from 'zod'

export const purchaseSchema = z.object({
  id: z.string(),
  date: z.string(),
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  notes: z.string().optional(),
  availableQuantity: z.number(),
})

export type Purchase = z.infer<typeof purchaseSchema>
