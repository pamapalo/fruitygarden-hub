import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useCart } from "@/contexts/CartContext";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus } from "lucide-react";
import { useState } from "react";
import PaymentDialog from "./PaymentDialog";

const CartButton = () => {
  const { items, totalItems, totalPrice, removeItem, updateQuantity, clearCart } = useCart();
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge 
              variant="destructive" 
              className="absolute -top-2 -right-2 h-6 w-6 flex items-center justify-center p-0 text-xs font-bold"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {totalItems > 0 ? `${totalItems} ${totalItems === 1 ? 'producto' : 'productos'} en tu carrito` : 'Tu carrito está vacío'}
          </SheetDescription>
        </SheetHeader>
        
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[60vh] text-muted-foreground">
            <ShoppingCart className="h-16 w-16 mb-4" />
            <p className="text-lg">No hay productos en el carrito</p>
          </div>
        ) : (
          <>
            <ScrollArea className="h-[60vh] mt-8">
              <div className="space-y-4">
                {items.map(item => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <div className="flex flex-col gap-1 mt-2">
                        {item.original_price && (
                          <span className="text-xs text-muted-foreground line-through">
                            ${item.original_price.toLocaleString('es-CO')} COP
                          </span>
                        )}
                        <span className="text-sm font-bold text-primary">
                          ${item.price.toLocaleString('es-CO')} COP
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-2 mt-3">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 ml-auto text-destructive"
                          onClick={() => removeItem(item.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-lg">
                        ${(item.price * item.quantity).toLocaleString('es-CO')} COP
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span className="text-2xl text-primary">
                  ${totalPrice.toLocaleString('es-CO')} COP
                </span>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={clearCart} className="flex-1">
                  Vaciar Carrito
                </Button>
                <Button className="flex-1" onClick={() => setPaymentDialogOpen(true)}>
                  Finalizar Compra
                </Button>
              </div>
            </div>
          </>
        )}
      </SheetContent>
      <PaymentDialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen} />
    </Sheet>
  );
};

export default CartButton;
