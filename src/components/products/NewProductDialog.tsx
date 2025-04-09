import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { PlusIcon } from 'lucide-react'
import { Input } from '@/components/ui/input'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react'
import { useProducts } from '@/context/ProductsContext'

const newProductSchema = z.object({
  name: z.string({
    required_error: 'Nome do produto é obrigatório',
  }),
  code: z.string(),
})

export type NewProduct = z.infer<typeof newProductSchema>

export function NewProductDialog() {
  const [open, setOpen] = useState(false)
  const form = useForm<NewProduct>({
    resolver: zodResolver(newProductSchema),
  })
  const { addProduct } = useProducts()

  const onSubmit = (data: NewProduct) => {
    addProduct(data)
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="flex items-center gap-2">
          <PlusIcon className="h-4 w-4" />
          Adicionar Produto
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar novo produto</DialogTitle>
          <DialogDescription>
            Informe os dados do produto para realizar o seu cadastro
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 mt-4"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Nome do produto:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o nome do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel>Código do produto:</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Digite o código do produto"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <DialogFooter>
              <Button type="submit">Adicionar Produto</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
