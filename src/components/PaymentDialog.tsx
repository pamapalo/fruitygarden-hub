import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Smartphone, CheckCircle } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";

interface PaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const PaymentDialog = ({ open, onOpenChange }: PaymentDialogProps) => {
  const { totalPrice, items, clearCart } = useCart();
  const { toast } = useToast();

  const handleNequiPayment = () => {
    // Mostrar información para pago por Nequi
    toast({
      title: "Pago con Nequi",
      description: "Serás redirigido a Nequi para completar tu pago",
    });
    
    // Intentar abrir la app de Nequi, si no funciona abre la web
    const nequiDeepLink = `nequi://`;
    const nequiWebUrl = `https://www.nequi.com.co/`;
    
    window.location.href = nequiDeepLink;
    
    // Fallback a la web después de un pequeño delay
    setTimeout(() => {
      window.open(nequiWebUrl, '_blank');
    }, 1000);
  };

  const handleDaviplataPayment = () => {
    // Mostrar información para pago por Daviplata
    toast({
      title: "Pago con Daviplata",
      description: "Serás redirigido a Daviplata para completar tu pago",
    });
    
    // Intentar abrir la app de Daviplata, si no funciona abre la web
    const daviplataDeepLink = `daviplata://`;
    const daviplataWebUrl = `https://www.daviplata.com/`;
    
    window.location.href = daviplataDeepLink;
    
    // Fallback a la web después de un pequeño delay
    setTimeout(() => {
      window.open(daviplataWebUrl, '_blank');
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CheckCircle className="h-6 w-6 text-primary" />
            Finalizar Compra
          </DialogTitle>
          <DialogDescription>
            Selecciona tu método de pago preferido
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Resumen de la orden */}
          <div className="bg-muted/50 rounded-lg p-4 space-y-2">
            <h3 className="font-semibold text-sm text-muted-foreground">Resumen del pedido</h3>
            <div className="space-y-1">
              {items.map(item => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span>{item.name} x{item.quantity}</span>
                  <span className="font-medium">${(item.price * item.quantity).toLocaleString('es-CO')}</span>
                </div>
              ))}
            </div>
            <div className="pt-2 border-t border-border flex justify-between font-bold text-lg">
              <span>Total:</span>
              <span className="text-primary">${totalPrice.toLocaleString('es-CO')} COP</span>
            </div>
          </div>

          {/* Botones de pago */}
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground text-center">Pagar con:</p>
            
            {/* Botón Nequi */}
            <Button 
              onClick={handleNequiPayment}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-lg hover:shadow-xl transition-all"
            >
              <Smartphone className="mr-3 h-6 w-6" />
              Pagar con Nequi
            </Button>

            {/* Botón Daviplata */}
            <Button 
              onClick={handleDaviplataPayment}
              className="w-full h-14 text-lg font-bold bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 shadow-lg hover:shadow-xl transition-all"
            >
              <Smartphone className="mr-3 h-6 w-6" />
              Pagar con Daviplata
            </Button>
          </div>

          {/* Información adicional */}
          <div className="bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg p-3">
            <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
              Al hacer clic, serás redirigido a la aplicación de pago seleccionada para completar tu transacción de forma segura.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentDialog;
