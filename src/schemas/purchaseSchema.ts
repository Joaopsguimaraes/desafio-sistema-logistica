import { z } from 'zod'

export const purchaseSchema = z.object({
  id: z.string().optional(),
  productId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
  notes: z.string().optional(),
  availableQuantity: z.number().optional(),
})

export type Purchase = z.infer<typeof purchaseSchema>
