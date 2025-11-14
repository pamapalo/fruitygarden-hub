import { Button } from "@/components/ui/button";
import CategorySection from "@/components/CategorySection";
import CartButton from "@/components/CartButton";
import AnimatedCounter from "@/components/AnimatedCounter";
import { Apple, Carrot, ShoppingBag, Phone, Mail, MapPin, Sparkles, TrendingUp, Award } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState, useRef } from "react";
import heroImage from "@/assets/hero-produce.jpg";
import fruitsIcon from "@/assets/fruits-icon.jpg";
import vegetablesIcon from "@/assets/vegetables-icon.jpg";
import othersIcon from "@/assets/others-icon.jpg";

interface Product {
  id: string;
  name: string;
  price: string;
  category: string;
}

const Index = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const productsRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await supabase
        .from("products")
        .select("id, name, price, category")
        .order("category", { ascending: true });
      if (data) setProducts(data);
    };
    fetchProducts();
  }, []);

  const scrollToProducts = () => {
    productsRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const categoryNames: Record<string, string> = {
    fruits: "Frutas",
    vegetables: "Vegetales",
    others: "Otros Productos",
    offers: "Ofertas"
  };
  return (
    <div className="min-h-screen max-h-screen overflow-y-auto">
      {/* Fixed Cart Button */}
      <div className="fixed top-4 right-4 z-50">
        <CartButton />
      </div>

      {/* Hero Section - Compacto */}
      <section className="relative h-[45vh] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 animate-[scale-in_1.5s_ease-out]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/25 to-accent/30 animate-fade-in"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground max-w-4xl px-4 animate-slide-up">
          <div className="mb-2 inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-primary-foreground/30 animate-float">
            <Award className="h-4 w-4" />
            <span className="text-xs font-semibold">Productos 100% Frescos</span>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black mb-2 drop-shadow-2xl leading-tight bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent animate-fade-in">
            Frescura que se Siente
          </h1>
          
          <p className="text-base md:text-lg mb-3 drop-shadow-lg font-medium max-w-2xl mx-auto animate-fade-in animation-delay-200">
            Del campo a tu mesa en 24 horas
          </p>
          
          <div className="flex flex-wrap gap-3 justify-center animate-fade-in animation-delay-400">
            <Button 
              variant="hero" 
              size="sm" 
              className="text-sm px-6 py-4 shadow-2xl animate-pulse-glow"
              onClick={scrollToProducts}
            >
              <Sparkles className="mr-2 h-4 w-4" />
              Explorar
            </Button>
            <Button 
              variant="outline" 
              size="sm" 
              className="text-sm px-6 py-4 bg-card/95 backdrop-blur-md hover:bg-card border-2 border-primary-foreground/40 hover:scale-110 transition-all shadow-xl"
              onClick={() => window.location.href = '/ofertas'}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Ofertas
            </Button>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-4 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-3 gap-3">
            <div className="text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in">
              <AnimatedCounter end={100} suffix="+" duration={2500} />
              <div className="text-xs font-semibold text-muted-foreground">Clientes</div>
            </div>
            
            <div className="text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <AnimatedCounter end={100} suffix="%" duration={2500} />
              <div className="text-xs font-semibold text-muted-foreground">Frescos</div>
            </div>
            
            <div className="text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-black text-primary mb-2">24h</div>
              <div className="text-xs font-semibold text-muted-foreground">Entrega</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={productsRef} className="py-4 px-4 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-3 animate-fade-in">
            <h2 className="text-2xl md:text-3xl font-black mb-1 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nuestras Categorías
            </h2>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <CategorySection title="Frutas" description="Fresas y más" icon={Apple} color="primary" link="/frutas" image={fruitsIcon} />
            <CategorySection title="Vegetales" description="Frescos" icon={Carrot} color="secondary" link="/vegetales" image={vegetablesIcon} />
            <CategorySection title="Otros" description="Variados" icon={ShoppingBag} color="pink" link="/otros" image={othersIcon} />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-black text-primary-foreground mb-4 animate-fade-in">
            ¿Listo para Probar la Frescura?
          </h2>
          <p className="text-xl text-primary-foreground/90 mb-8 animate-fade-in animation-delay-200">
            Haz tu pedido hoy y recibe los productos más frescos en tu puerta
          </p>
          <Button size="lg" className="text-lg px-10 py-6 bg-card text-primary hover:bg-card/90 shadow-2xl hover:scale-110 transition-all animate-scale-in animation-delay-400">
            <ShoppingBag className="mr-3 h-6 w-6" />
            Comprar Ahora
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section className="py-3 px-4 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl md:text-2xl font-bold text-center mb-3 animate-fade-in">Contáctanos</h2>
          <div className="grid grid-cols-3 gap-3">
            <a 
              href="tel:+573167538266"
              className="flex flex-col items-center text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
            >
              <Phone className="h-8 w-8 text-primary mb-1" />
              <h3 className="text-sm font-bold mb-1">Teléfono</h3>
              <p className="text-xs text-muted-foreground font-medium">+57 316 753 8266</p>
            </a>

            <a 
              href="mailto:adrisolanoflorez@hotmail.com"
              className="flex flex-col items-center text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: '0.1s' }}
            >
              <Mail className="h-8 w-8 text-secondary mb-1" />
              <h3 className="text-sm font-bold mb-1">Email</h3>
              <p className="text-xs text-muted-foreground font-medium">adrisolanoflorez@hotmail.com</p>
            </a>

            <a 
              href="https://wa.me/573167538266"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-3 bg-card rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: '0.2s' }}
            >
              <Phone className="h-8 w-8 text-accent mb-1" />
              <h3 className="text-sm font-bold mb-1">WhatsApp</h3>
              <p className="text-xs text-muted-foreground font-medium">+57 316 753 8266</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-2 px-4 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="text-xs font-medium">&copy; 2024 Productos Frescos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
