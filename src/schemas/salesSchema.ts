import { z } from 'zod'

export const likedPurchasesSchema = z.object({
  purchaseId: z.string(),
  quantity: z.number(),
  unitPrice: z.number(),
  totalPrice: z.number(),
})

export const salesSchema = z.object({
  id: z.string().optional(),
  productId: z.string({
    required_error: 'Deve selecionar um produto',
  }),
  quantity: z.number({
    required_error: 'Deve informar a quantidade',
  }),
  unitPrice: z.number({
    required_error: 'Deve informar o preço',
  }),
  totalPrice: z.number({}),
  notes: z.string().optional(),
  linkedPurchases: z.array(likedPurchasesSchema),
  createdAt: z.date(),
})

export type Sales = z.infer<typeof salesSchema>

export type LinkedPurchases = z.infer<typeof likedPurchasesSchema>
