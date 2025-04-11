/* eslint-disable react-hooks/exhaustive-deps */
import { Product } from '@/schemas/productSchema'
import { Purchase } from '@/schemas/purchaseSchema'
import { PlusIcon, Trash2Icon } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useProducts } from '@/hooks/useProducts'
import { useLinked } from '@/hooks/useLinked'

export function LinkSaleDialog() {
  const { getProductById, getAvailablePurchasesForProduct } = useProducts()
  const {
    currentSale,
    isOpenLinkDialog,
    setIsOpenLinkDialog,
    linkedPurchases,
    onLinkSubmit,
    onLinkedPurchaseChange,
    onAddLinkedPurchase,
    onRemoveLinkedPurchase,
  } = useLinked()
  const [product, setProduct] = useState<Product | null>(null)
  const [availablePurchases, setAvailablePurchases] = useState<Purchase[]>([])

  const currentlyLinkedQuantity = useMemo(
    () => linkedPurchases.reduce((acc, lp) => acc + lp.quantity, 0),
    [linkedPurchases],
  )

  const remainingToLink = useMemo(
    () => (currentSale ? currentSale.quantity - currentlyLinkedQuantity : 0),
    [currentlyLinkedQuantity, currentSale],
  )

  useEffect(() => {
    if (currentSale) {
      const product = getProductById(currentSale!.productId)
      if (product) {
        setProduct(product)
      }

      const availablePurchase = getAvailablePurchasesForProduct(
        currentSale!.productId,
      )

      if (availablePurchase) {
        setAvailablePurchases(availablePurchase)
      }
    }
  }, [currentSale])

  return (
    <Dialog
      open={isOpenLinkDialog}
      onOpenChange={setIsOpenLinkDialog}
    >
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Vincule a venda com a compra</DialogTitle>
          <DialogDescription>
            Realize a vinculação dessa venda para uma ou mais transação de
            compra.
          </DialogDescription>
        </DialogHeader>
        {currentSale && (
          <form
            onSubmit={onLinkSubmit}
            className="space-y-4 mt-4"
          >
            <>
              <div className="bg-muted/50 p-4 rounded-md space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Produto:</span>
                  <span className="text-sm">{product?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Quantidade vendida:
                  </span>
                  <span className="text-sm">{currentSale.quantity}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">
                    Quantidade vinculada:
                  </span>
                  <span
                    className={`text-sm ${
                      remainingToLink > 0 ? 'text-amber-600' : 'text-success'
                    }`}
                  >
                    {currentlyLinkedQuantity}/{currentSale.quantity}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm font-medium">Restante:</span>
                  <span
                    className={`text-sm ${
                      remainingToLink > 0 ? 'text-amber-600' : 'text-success'
                    }`}
                  >
                    {remainingToLink}
                  </span>
                </div>
              </div>

              {linkedPurchases.length > 0 ? (
                <div className="space-y-3">
                  <Label>Compras vinculadas</Label>
                  {linkedPurchases.map((lp, index) => {
                    const purchase = availablePurchases.find(
                      (p) => p.id === lp.purchaseId,
                    ) || {
                      id: lp.purchaseId,
                      date: '',
                      availableQuantity: 0,
                      unitPrice: lp.unitPrice,
                    }
                    return (
                      <div
                        key={index}
                        className="flex gap-2 items-end"
                      >
                        <div className="flex-1">
                          <Label className="text-xs mb-1 block">Compras</Label>
                          <Select
                            value={lp.purchaseId}
                            onValueChange={(value) => {
                              const purchase = availablePurchases.find(
                                (p) => p.id === value,
                              )
                              onLinkedPurchaseChange(index, 'purchaseId', value)
                              if (purchase) {
                                onLinkedPurchaseChange(
                                  index,
                                  'unitPrice',
                                  purchase.unitPrice,
                                )
                              }
                            }}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Selecione a compra" />
                            </SelectTrigger>
                            <SelectContent>
                              {availablePurchases.map((p) => (
                                <SelectItem
                                  key={p.id}
                                  value={p.id}
                                >
                                  {p.availableQuantity} Quantidade(s)
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="w-20">
                          <Label className="text-xs mb-1 block">
                            Quantidade
                          </Label>
                          <Input
                            type="number"
                            min="1"
                            max={purchase.availableQuantity}
                            value={lp.quantity || ''}
                            onChange={(e) =>
                              onLinkedPurchaseChange(
                                index,
                                'quantity',
                                Number(e.target.value),
                              )
                            }
                            placeholder="0"
                          />
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => onRemoveLinkedPurchase(index)}
                        >
                          <Trash2Icon className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="text-center py-6 text-muted-foreground">
                  <p>Não foram vinculadas compras ainda</p>
                </div>
              )}

              <div className="flex justify-between">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onAddLinkedPurchase}
                  disabled={
                    availablePurchases.length === 0 || remainingToLink <= 0
                  }
                >
                  <PlusIcon className="h-4 w-4 mr-2" />
                  Adicionar vinculo
                </Button>

                <Button type="submit">Salvar vínculos</Button>
              </div>
            </>
          </form>
        )}
      </DialogContent>
    </Dialog>
  )
}
