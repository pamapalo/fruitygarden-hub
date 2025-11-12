import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductManager from "@/components/ProductManager";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Others = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "others")
        .order("created_at", { ascending: false });

      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      toast({
        title: "Error",
        description: "No se pudieron cargar los productos.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink/5 via-background to-accent/5">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")} size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-pink/10 rounded-full">
              <ShoppingBag className="h-8 w-8 text-pink" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Otros Productos</h1>
              <p className="text-muted-foreground">Gestiona tu catálogo de productos especiales</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <ProductManager category="others" products={products} onProductsChange={fetchProducts} />
        )}
      </div>
    </div>
  );
};

export default Others;
