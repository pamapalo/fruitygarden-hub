import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

const Others = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "others")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar los productos", variant: "destructive" });
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price) {
      toast({ title: "Error", description: "Todos los campos son requeridos", variant: "destructive" });
      return;
    }

    const { error } = await supabase.from("products").insert({
      name: newProduct.name,
      description: newProduct.description,
      price: newProduct.price,
      category: "others",
    });

    if (error) {
      toast({ title: "Error", description: "No se pudo agregar el producto", variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Producto agregado correctamente" });
      setNewProduct({ name: "", description: "", price: "" });
      setOpen(false);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "No se pudo eliminar el producto", variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Producto eliminado correctamente" });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-pink/10 border-b-4 border-pink py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          <h1 className="text-4xl font-bold text-pink mb-2">Otros Productos</h1>
          <p className="text-lg text-muted-foreground">Gestiona tu catálogo de productos especiales</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Productos</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button className="bg-pink hover:bg-pink/90 text-primary-foreground">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Producto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nuevo Producto</DialogTitle>
                <DialogDescription>Completa los datos del producto</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Ej: Miel Orgánica"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Describe el producto"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio</Label>
                  <Input
                    id="price"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="$8.99/unidad"
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Agregar Producto
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Cargando productos...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-muted-foreground">No hay productos en esta categoría</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-l-4 border-l-pink hover:shadow-lg transition-all">
                <CardHeader>
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-pink">{product.price}</span>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Others;
