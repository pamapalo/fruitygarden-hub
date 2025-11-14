import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Sparkles, Trash2 } from "lucide-react";
import { useCart } from "@/contexts/CartContext";
import { useToast } from "@/hooks/use-toast";
import fruitsIcon from "@/assets/fruits-icon.jpg";
import vegetablesIcon from "@/assets/vegetables-icon.jpg";
import othersIcon from "@/assets/others-icon.jpg";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: string;
  category: "fruits" | "vegetables" | "others" | "offers";
  image?: string;
  discount_percentage?: number;
  original_price?: string;
  showCategoryIcon?: boolean;
  onDelete?: (id: string) => void;
}

const ProductCard = ({ id, name, description, price, category, discount_percentage, original_price, image, showCategoryIcon = false, onDelete }: ProductCardProps) => {
  const { addItem } = useCart();
  const { toast } = useToast();

  const handleAddToCart = () => {
    const priceNum = parseFloat(price.replace(/[^\d]/g, '')) || 0;
    const originalPriceNum = original_price ? parseFloat(original_price.replace(/[^\d]/g, '')) : undefined;
    
    addItem({
      id,
      name,
      price: priceNum,
      original_price: originalPriceNum,
      category
    });
    
    toast({
      title: "Producto añadido",
      description: `${name} se agregó al carrito`,
    });
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete(id);
    }
  };
  const categoryConfig = {
    fruits: {
      borderColor: "border-l-primary",
      badgeColor: "bg-primary/10 text-primary",
      priceColor: "text-primary",
      glowColor: "group-hover:shadow-primary/30",
      icon: fruitsIcon
    },
    vegetables: {
      borderColor: "border-l-secondary",
      badgeColor: "bg-secondary/10 text-secondary",
      priceColor: "text-secondary",
      glowColor: "group-hover:shadow-secondary/30",
      icon: vegetablesIcon
    },
    others: {
      borderColor: "border-l-pink",
      badgeColor: "bg-pink/10 text-pink",
      priceColor: "text-pink",
      glowColor: "group-hover:shadow-pink/30",
      icon: othersIcon
    },
    offers: {
      borderColor: "border-l-pink",
      badgeColor: "bg-pink/10 text-pink",
      priceColor: "text-pink",
      glowColor: "group-hover:shadow-pink/30",
      icon: othersIcon
    },
  };

  const config = categoryConfig[category];

  return (
    <Card className={`group relative overflow-hidden ${config.borderColor} border-l-4 hover:shadow-2xl ${config.glowColor} transition-all duration-500 hover:scale-105 hover:-translate-y-2 cursor-pointer bg-gradient-to-br from-card to-card/50`}>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      {showCategoryIcon && (
        <img 
          src={image || config.icon} 
          alt={`${category} icon`}
          className="absolute top-3 right-3 w-12 h-12 object-cover rounded-lg shadow-md z-10 opacity-80 group-hover:opacity-100 transition-opacity"
        />
      )}
      
      {discount_percentage && (
        <div className={`absolute top-4 ${showCategoryIcon ? 'right-20' : 'right-4'} bg-gradient-to-br from-pink to-accent text-white px-4 py-2 text-sm font-black rounded-full shadow-lg z-20 animate-pulse-glow`}>
          -{discount_percentage}%
        </div>
      )}
      
      <CardHeader className="relative z-10">
        <div className="flex items-start justify-between mb-2">
          <CardTitle className="text-2xl font-bold group-hover:text-primary transition-colors">{name}</CardTitle>
          <div className={`${config.badgeColor} px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1 animate-pulse-glow`}>
            <Sparkles className="h-3 w-3" />
            FRESCO
          </div>
        </div>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="relative z-10">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-1">
            {original_price && parseFloat(original_price.replace(/[^\d]/g, '')) > 0 && (
              <span className="text-sm text-muted-foreground line-through">
                ${parseFloat(original_price.replace(/[^\d]/g, '')).toLocaleString('es-CO')} COP
              </span>
            )}
            <span className={`text-3xl font-black ${config.priceColor} group-hover:scale-110 transition-transform`}>
              ${parseFloat(price.replace(/[^\d]/g, '') || '0').toLocaleString('es-CO')} COP
            </span>
            {original_price && parseFloat(original_price.replace(/[^\d]/g, '')) > 0 && parseFloat(price.replace(/[^\d]/g, '')) > 0 && (
              <span className="text-xs text-accent font-semibold">
                Ahorras: ${(parseFloat(original_price.replace(/[^\d]/g, '')) - parseFloat(price.replace(/[^\d]/g, ''))).toLocaleString('es-CO')} COP
              </span>
            )}
          </div>
          <div className="flex gap-2">
            <Button 
              size="sm" 
              variant="default"
              className="shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Añadir
            </Button>
            {onDelete && (
              <Button 
                size="sm" 
                variant="destructive"
                className="shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300"
                onClick={handleDelete}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
