import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import CategorySection from "@/components/CategorySection";
import { Apple, Carrot, ShoppingBag, Phone, Mail, MapPin, Sparkles, TrendingUp, Award } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";

const Index = () => {
  const products = [
    { name: "Fresas Frescas", description: "Fresas dulces y jugosas, recién cosechadas", price: "$4.99/lb", category: "fruits" as const },
    { name: "Arándanos Premium", description: "Arándanos seleccionados de alta calidad", price: "$6.99/lb", category: "fruits" as const },
    { name: "Naranjas Jugosas", description: "Cítricos frescos con alto contenido de vitamina C", price: "$3.99/lb", category: "fruits" as const },
    { name: "Lechuga Orgánica", description: "Lechuga fresca cultivada sin pesticidas", price: "$2.99/unidad", category: "vegetables" as const },
    { name: "Cebollas Moradas", description: "Cebollas frescas ideales para ensaladas", price: "$2.49/lb", category: "vegetables" as const },
    { name: "Remolachas", description: "Remolachas nutritivas y sabrosas", price: "$3.49/lb", category: "vegetables" as const },
  ];

  return (
    <div className="min-h-screen overflow-hidden">
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
            <Button variant="hero" size="lg" className="text-lg px-10 py-7 shadow-2xl animate-pulse-glow">
              <Sparkles className="mr-2 h-6 w-6" />
              Explorar Productos
            </Button>
            <Button variant="outline" size="lg" className="text-lg px-10 py-7 bg-card/95 backdrop-blur-md hover:bg-card border-2 border-primary-foreground/40 hover:scale-110 transition-all shadow-xl">
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
      <section className="py-24 px-6 bg-gradient-to-b from-background to-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Nuestras Categorías
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">Explora nuestra selección premium de productos frescos</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategorySection title="Frutas" description="Fresas, arándanos, cítricos y más" icon={Apple} color="primary" link="/frutas" />
            <CategorySection title="Vegetales" description="Vegetales frescos y orgánicos" icon={Carrot} color="secondary" link="/vegetales" />
            <CategorySection title="Otros Productos" description="Selección especial de productos variados" icon={ShoppingBag} color="pink" link="/otros" />
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-gradient-to-b from-muted/30 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-5xl md:text-6xl font-black mb-4">Productos Destacados</h2>
            <p className="text-xl text-muted-foreground">Lo mejor de nuestra selección</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, i) => (
              <div key={i} className="animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <ProductCard {...product} />
              </div>
            ))}
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
            {[
              { icon: Phone, title: "Teléfono", info: "+1 (555) 123-4567", color: "text-primary" },
              { icon: Mail, title: "Email", info: "info@productosfresco.com", color: "text-secondary" },
              { icon: MapPin, title: "Ubicación", info: "Ciudad, Estado", color: "text-accent" }
            ].map((contact, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-card rounded-2xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-scale-in" style={{ animationDelay: `${i * 0.1}s` }}>
                <contact.icon className={`h-14 w-14 ${contact.color} mb-4`} />
                <h3 className="text-xl font-bold mb-2">{contact.title}</h3>
                <p className="text-muted-foreground font-medium">{contact.info}</p>
              </div>
            ))}
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
