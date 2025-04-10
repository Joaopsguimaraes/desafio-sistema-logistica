import { z } from 'zod'

export const productSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: 'Nome do produto é obrigatório',
    })
    .min(2, { message: 'Nome do produto deve ter ao menos 2 caracteres' }),
  unit: z
    .string({
      required_error: 'Unidade é obrigatório',
    })
    .min(1, { message: 'Unidade é obrigatório' }),
})

export type Product = z.infer<typeof productSchema>
