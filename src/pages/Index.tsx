import { Button } from "@/components/ui/button";
import CategorySection from "@/components/CategorySection";
import CartButton from "@/components/CartButton";
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
    <div className="min-h-screen overflow-hidden">
      {/* Fixed Cart Button */}
      <div className="fixed top-6 right-6 z-50">
        <CartButton />
      </div>

      {/* Hero Section - Ultra Impactante */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center scale-110 animate-[scale-in_1.5s_ease-out]"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-secondary/25 to-accent/30 animate-fade-in"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent"></div>
        </div>
        
        <div className="relative z-10 text-center text-primary-foreground max-w-5xl px-6 animate-slide-up">
          <div className="mb-6 inline-flex items-center gap-2 bg-primary-foreground/20 backdrop-blur-md px-6 py-3 rounded-full border border-primary-foreground/30 animate-float">
            <Award className="h-5 w-5" />
            <span className="text-sm font-semibold">Productos 100% Frescos y Naturales</span>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-black mb-6 drop-shadow-2xl leading-tight bg-gradient-to-r from-white via-primary-foreground to-white bg-clip-text text-transparent animate-fade-in">
            Frescura que se Siente
          </h1>
          
          <p className="text-2xl md:text-3xl mb-10 drop-shadow-lg font-medium max-w-3xl mx-auto animate-fade-in animation-delay-200">
            Del campo a tu mesa en 24 horas. Calidad garantizada, sabor incomparable.
          </p>
          
          <div className="flex flex-wrap gap-6 justify-center animate-fade-in animation-delay-400">
            <Button 
              variant="hero" 
              size="lg" 
              className="text-lg px-10 py-7 shadow-2xl animate-pulse-glow"
              onClick={scrollToProducts}
            >
              <Sparkles className="mr-2 h-6 w-6" />
              Explorar Productos
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="text-lg px-10 py-7 bg-card/95 backdrop-blur-md hover:bg-card border-2 border-primary-foreground/40 hover:scale-110 transition-all shadow-xl"
              onClick={() => window.location.href = '/ofertas'}
            >
              <TrendingUp className="mr-2 h-6 w-6" />
              Ofertas Especiales
            </Button>
          </div>
        </div>
        
        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-primary-foreground/50 rounded-full flex justify-center p-2">
            <div className="w-1 h-3 bg-primary-foreground/70 rounded-full animate-[slide-up_1s_ease-in-out_infinite]"></div>
          </div>
        </div>
      </section>


      {/* Stats Section */}
      <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "5000+", label: "Clientes Satisfechos" },
              { number: "100%", label: "Productos Frescos" },
              { number: "24h", label: "Entrega Rápida" }
            ].map((stat, i) => (
              <div key={i} className="text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="text-5xl font-black text-primary mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section ref={productsRef} className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nuestras Categorías
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Explora nuestra selección premium de productos frescos</p>
          </div>
          
          <div className="space-y-16">
            {/* Frutas */}
            <div className="space-y-8">
              <CategorySection title="Frutas" description="Fresas, arándanos, cítricos y más" icon={Apple} color="primary" link="/frutas" image={fruitsIcon} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {products.filter(p => p.category === 'fruits').map((product) => (
                  <div key={product.id} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-primary/20 hover:border-primary/40 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <p className="text-2xl font-black text-primary">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vegetales */}
            <div className="space-y-8">
              <CategorySection title="Vegetales" description="Vegetales frescos y orgánicos" icon={Carrot} color="secondary" link="/vegetales" image={vegetablesIcon} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {products.filter(p => p.category === 'vegetables').map((product) => (
                  <div key={product.id} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-secondary/20 hover:border-secondary/40 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <p className="text-2xl font-black text-secondary">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Otros Productos */}
            <div className="space-y-8">
              <CategorySection title="Otros Productos" description="Selección especial de productos variados" icon={ShoppingBag} color="pink" link="/otros" image={othersIcon} />
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 px-4">
                {products.filter(p => p.category === 'others').map((product) => (
                  <div key={product.id} className="bg-card/50 backdrop-blur-sm rounded-xl p-6 border border-pink/20 hover:border-pink/40 hover:shadow-lg transition-all">
                    <h4 className="font-bold text-lg mb-2">{product.name}</h4>
                    <p className="text-2xl font-black text-pink">{product.price}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-primary via-secondary to-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJNMzYgMzRjMC0yLjIxLTEuNzktNC00LTRzLTQgMS43OS00IDQgMS43OSA0IDQgNCA0LTEuNzkgNC00em0wLTEwYzAtMi4yMS0xLjc5LTQtNC00cy00IDEuNzktNCA0IDEuNzkgNCA0IDQgNC0xLjc5IDQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-black text-primary-foreground mb-6 animate-fade-in">
            ¿Listo para Probar la Frescura?
          </h2>
          <p className="text-2xl text-primary-foreground/90 mb-10 animate-fade-in animation-delay-200">
            Haz tu pedido hoy y recibe los productos más frescos en tu puerta
          </p>
          <Button size="lg" className="text-xl px-12 py-8 bg-card text-primary hover:bg-card/90 shadow-2xl hover:scale-110 transition-all animate-scale-in animation-delay-400">
            <ShoppingBag className="mr-3 h-7 w-7" />
            Comprar Ahora
          </Button>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12 animate-fade-in">Contáctanos</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <a 
              href="tel:+573167538266"
              className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
            >
              <Phone className="h-14 w-14 text-primary mb-4" />
              <h3 className="text-xl font-bold mb-2">Teléfono</h3>
              <p className="text-muted-foreground font-medium">+57 316 753 8266</p>
            </a>

            <a 
              href="mailto:ferneycastro75@gmail.com"
              className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: '0.1s' }}
            >
              <Mail className="h-14 w-14 text-secondary mb-4" />
              <h3 className="text-xl font-bold mb-2">Email</h3>
              <p className="text-muted-foreground font-medium">ferneycastro75@gmail.com</p>
            </a>

            <a 
              href="https://wa.me/573167538266"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in cursor-pointer"
              style={{ animationDelay: '0.2s' }}
            >
              <Phone className="h-14 w-14 text-accent mb-4" />
              <h3 className="text-xl font-bold mb-2">WhatsApp</h3>
              <p className="text-muted-foreground font-medium">+57 316 753 8266</p>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p className="font-medium">&copy; 2024 Productos Frescos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
