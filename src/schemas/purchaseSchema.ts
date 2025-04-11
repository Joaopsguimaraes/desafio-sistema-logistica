import { z } from 'zod'

export const purchaseSchema = z.object({
  id: z.string().optional(),
  productId: z.string({
    required_error: 'Deve selecionar um produto',
  }),
  quantity: z.number({
    required_error: 'Deve informar uma quantidade',
  }),
  unitPrice: z.number({
    required_error: 'Deve informar um valor unitário',
  }),
  totalPrice: z.number(),
  notes: z.string().optional(),
  availableQuantity: z.number(),
  createdAt: z.date(),
})

export type Purchase = z.infer<typeof purchaseSchema>
