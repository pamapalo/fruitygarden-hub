import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Carrot } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ProductManager from "@/components/ProductManager";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Vegetables = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("category", "vegetables")
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
    <div className="min-h-screen bg-gradient-to-br from-secondary/5 via-background to-purple-veggie/5">
      <div className="container mx-auto px-6 py-12">
        <div className="mb-8 flex items-center gap-4">
          <Button variant="outline" onClick={() => navigate("/")} size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="p-3 bg-secondary/10 rounded-full">
              <Carrot className="h-8 w-8 text-secondary" />
            </div>
            <div>
              <h1 className="text-4xl font-bold">Vegetales Frescos</h1>
              <p className="text-muted-foreground">Gestiona tu catálogo de vegetales</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Cargando productos...</p>
          </div>
        ) : (
          <ProductManager category="vegetables" products={products} onProductsChange={fetchProducts} />
        )}
      </div>
    </div>
  );
};

export default Vegetables;
