import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  name: string;
  description: string;
  price: string;
  category: "fruits" | "vegetables" | "others";
  image?: string;
}

const ProductCard = ({ name, description, price, category }: ProductCardProps) => {
  const categoryColors = {
    fruits: "border-l-4 border-l-primary",
    vegetables: "border-l-4 border-l-secondary",
    others: "border-l-4 border-l-pink",
  };

  return (
    <Card className={`hover:shadow-lg transition-all duration-300 ${categoryColors[category]}`}>
      <CardHeader>
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">{price}</span>
          <Button size="sm" variant="default">
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
