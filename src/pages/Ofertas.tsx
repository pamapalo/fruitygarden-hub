import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Trash2, Plus, ArrowLeft, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
  discount_percentage?: number;
  original_price?: string;
}

const Ofertas = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", discount_percentage: "", original_price: "" });
  const navigate = useNavigate();
  const { toast } = useToast();

  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "offers")
      .order("created_at", { ascending: false });

    if (error) {
      toast({ title: "Error", description: "No se pudieron cargar las ofertas", variant: "destructive" });
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
      category: "offers",
      discount_percentage: newProduct.discount_percentage ? parseInt(newProduct.discount_percentage) : null,
      original_price: newProduct.original_price || null,
    });

    if (error) {
      toast({ title: "Error", description: "No se pudo agregar la oferta", variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Oferta agregada correctamente" });
      setNewProduct({ name: "", description: "", price: "", discount_percentage: "", original_price: "" });
      setOpen(false);
      fetchProducts();
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast({ title: "Error", description: "No se pudo eliminar la oferta", variant: "destructive" });
    } else {
      toast({ title: "Éxito", description: "Oferta eliminada correctamente" });
      fetchProducts();
    }
  };

  return (
    <div className="min-h-screen bg-muted/30">
      <div className="bg-gradient-to-r from-pink/20 via-accent/20 to-primary/20 border-b-4 border-pink py-8">
        <div className="max-w-7xl mx-auto px-6">
          <Button variant="ghost" onClick={() => navigate("/")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
          <div className="flex items-center gap-4 mb-2">
            <TrendingUp className="h-10 w-10 text-pink" />
            <h1 className="text-4xl font-bold bg-gradient-to-r from-pink via-accent to-primary bg-clip-text text-transparent">Ofertas Especiales</h1>
          </div>
          <p className="text-lg text-muted-foreground">Gestiona tus promociones y ofertas especiales</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold">Promociones Activas</h2>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="hero">
                <Plus className="mr-2 h-4 w-4" />
                Agregar Oferta
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Agregar Nueva Oferta</DialogTitle>
                <DialogDescription>Completa los datos de la promoción</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    value={newProduct.name}
                    onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                    placeholder="Ej: Pack de Frutas 2x1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">Descripción</Label>
                  <Textarea
                    id="description"
                    value={newProduct.description}
                    onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                    placeholder="Describe la promoción"
                  />
                </div>
                <div>
                  <Label htmlFor="original_price">Precio Original (COP)</Label>
                  <Input
                    id="original_price"
                    type="number"
                    value={newProduct.original_price}
                    onChange={(e) => setNewProduct({ ...newProduct, original_price: e.target.value })}
                    placeholder="50000"
                  />
                </div>
                <div>
                  <Label htmlFor="discount">Porcentaje de Descuento (%)</Label>
                  <Input
                    id="discount"
                    type="number"
                    min="0"
                    max="100"
                    value={newProduct.discount_percentage}
                    onChange={(e) => setNewProduct({ ...newProduct, discount_percentage: e.target.value })}
                    placeholder="20"
                  />
                </div>
                <div>
                  <Label htmlFor="price">Precio con Descuento (COP)</Label>
                  <Input
                    id="price"
                    type="number"
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                    placeholder="40000"
                  />
                </div>
                <Button onClick={handleAddProduct} className="w-full">
                  Agregar Oferta
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {loading ? (
          <p className="text-center text-muted-foreground">Cargando ofertas...</p>
        ) : products.length === 0 ? (
          <div className="text-center py-12">
            <TrendingUp className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-lg">No hay ofertas activas en este momento</p>
            <p className="text-muted-foreground text-sm mt-2">Agrega promociones para atraer más clientes</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id} className="border-l-4 border-l-pink hover:shadow-2xl transition-all hover:scale-105 relative overflow-hidden">
                {product.discount_percentage && (
                  <div className="absolute top-4 right-4 bg-gradient-to-br from-pink to-accent text-white px-6 py-3 text-lg font-black rounded-full shadow-lg z-10 animate-pulse-glow">
                    -{product.discount_percentage}%
                  </div>
                )}
                <div className="absolute top-0 left-0 bg-pink text-pink-foreground px-4 py-1 text-xs font-bold rounded-br-lg">
                  OFERTA
                </div>
                <CardHeader className="pt-12">
                  <CardTitle className="text-xl">{product.name}</CardTitle>
                  <CardDescription>{product.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                      {product.original_price && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${parseInt(product.original_price).toLocaleString('es-CO')} COP
                        </span>
                      )}
                      <span className="text-2xl font-bold text-pink">
                        ${parseInt(product.price).toLocaleString('es-CO')} COP
                      </span>
                      {product.original_price && (
                        <span className="text-xs text-accent font-semibold">
                          Ahorras: ${(parseInt(product.original_price) - parseInt(product.price)).toLocaleString('es-CO')} COP
                        </span>
                      )}
                    </div>
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

export default Ofertas;
