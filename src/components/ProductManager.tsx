import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Plus, X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { z } from "zod";

interface ProductManagerProps {
  category: "fruits" | "vegetables" | "others";
  products: Array<{
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
  }>;
  onProductsChange: () => void;
}

const productSchema = z.object({
  name: z.string().trim().min(1, "El nombre es requerido").max(100, "Máximo 100 caracteres"),
  description: z.string().trim().min(1, "La descripción es requerida").max(500, "Máximo 500 caracteres"),
  price: z.string().trim().min(1, "El precio es requerido").max(50, "Máximo 50 caracteres"),
});

const ProductManager = ({ category, products, onProductsChange }: ProductManagerProps) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", description: "", price: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const categoryColors = {
    fruits: { border: "border-primary", bg: "bg-primary/5", text: "text-primary" },
    vegetables: { border: "border-secondary", bg: "bg-secondary/5", text: "text-secondary" },
    others: { border: "border-pink", bg: "bg-pink/5", text: "text-pink" },
  };

  const colors = categoryColors[category];

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const validatedData = productSchema.parse(formData);
      setIsSubmitting(true);

      const { error } = await supabase.from("products").insert([
        {
          name: validatedData.name,
          description: validatedData.description,
          price: validatedData.price,
          category,
        },
      ]);

      if (error) throw error;

      toast({
        title: "Producto agregado",
        description: "El producto se ha añadido exitosamente.",
      });

      setFormData({ name: "", description: "", price: "" });
      setShowAddForm(false);
      onProductsChange();
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast({
          title: "Error de validación",
          description: error.errors[0].message,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "No se pudo agregar el producto.",
          variant: "destructive",
        });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const { error } = await supabase.from("products").delete().eq("id", id);

      if (error) throw error;

      toast({
        title: "Producto eliminado",
        description: "El producto se ha eliminado exitosamente.",
      });

      onProductsChange();
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudo eliminar el producto.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold">Gestionar Productos</h2>
        <Button
          onClick={() => setShowAddForm(!showAddForm)}
          variant={showAddForm ? "outline" : "default"}
          className={showAddForm ? "" : colors.text}
        >
          {showAddForm ? (
            <>
              <X className="mr-2 h-4 w-4" />
              Cancelar
            </>
          ) : (
            <>
              <Plus className="mr-2 h-4 w-4" />
              Agregar Producto
            </>
          )}
        </Button>
      </div>

      {showAddForm && (
        <Card className={`${colors.border} border-2 ${colors.bg}`}>
          <CardHeader>
            <CardTitle>Nuevo Producto</CardTitle>
            <CardDescription>Completa los datos para agregar un nuevo producto</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre del Producto</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Fresas Frescas"
                  required
                  maxLength={100}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descripción</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Describe el producto..."
                  required
                  maxLength={500}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Precio</Label>
                <Input
                  id="price"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                  placeholder="Ej: $4.99/lb"
                  required
                  maxLength={50}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Agregando..." : "Agregar Producto"}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className={`${colors.border} border-l-4`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle>{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteProduct(product.id)}
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <p className={`text-2xl font-bold ${colors.text}`}>{product.price}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No hay productos en esta categoría. ¡Agrega el primero!
          </p>
        </div>
      )}
    </div>
  );
};

export default ProductManager;
