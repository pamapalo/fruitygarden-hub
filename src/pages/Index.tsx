import { Button } from "@/components/ui/button";
import ProductCard from "@/components/ProductCard";
import CategorySection from "@/components/CategorySection";
import { Apple, Carrot, ShoppingBag, Phone, Mail, MapPin } from "lucide-react";
import heroImage from "@/assets/hero-produce.jpg";

const Index = () => {
  const products = [
    {
      name: "Fresas Frescas",
      description: "Fresas dulces y jugosas, recién cosechadas",
      price: "$4.99/lb",
      category: "fruits" as const,
    },
    {
      name: "Arándanos Premium",
      description: "Arándanos seleccionados de alta calidad",
      price: "$6.99/lb",
      category: "fruits" as const,
    },
    {
      name: "Naranjas Jugosas",
      description: "Cítricos frescos con alto contenido de vitamina C",
      price: "$3.99/lb",
      category: "fruits" as const,
    },
    {
      name: "Lechuga Orgánica",
      description: "Lechuga fresca cultivada sin pesticidas",
      price: "$2.99/unidad",
      category: "vegetables" as const,
    },
    {
      name: "Cebollas Moradas",
      description: "Cebollas frescas ideales para ensaladas",
      price: "$2.49/lb",
      category: "vegetables" as const,
    },
    {
      name: "Remolachas",
      description: "Remolachas nutritivas y sabrosas",
      price: "$3.49/lb",
      category: "vegetables" as const,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/80 via-secondary/70 to-primary/80"></div>
        </div>
        <div className="relative z-10 text-center text-primary-foreground max-w-4xl px-6">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
            Productos Frescos y Naturales
          </h1>
          <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
            Frutas, vegetales y más, directo del campo a tu mesa
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button variant="hero" size="lg">
              Ver Productos
            </Button>
            <Button variant="outline" size="lg" className="bg-card/90 hover:bg-card border-2">
              Contáctanos
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Nuestras Categorías
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <CategorySection
              title="Frutas"
              description="Fresas, arándanos, cítricos y más"
              icon={Apple}
              color="primary"
            />
            <CategorySection
              title="Vegetales"
              description="Vegetales frescos y orgánicos"
              icon={Carrot}
              color="secondary"
            />
            <CategorySection
              title="Otros Productos"
              description="Selección especial de productos variados"
              icon={ShoppingBag}
              color="pink"
            />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Productos Destacados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-8">
            Sobre Nosotros
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-6 leading-relaxed">
            Somos emprendedores apasionados por ofrecer productos frescos de la más alta calidad. 
            Nuestras frutas, vegetales y productos especiales son cuidadosamente seleccionados 
            para garantizar frescura y sabor excepcional en cada entrega.
          </p>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            Trabajamos directamente con productores locales para traerte lo mejor del campo a tu mesa, 
            apoyando la agricultura sostenible y el comercio justo.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Contáctanos
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
              <Phone className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Teléfono</h3>
              <p className="text-muted-foreground">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
              <Mail className="h-12 w-12 text-secondary mb-4" />
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <p className="text-muted-foreground">info@productosfresco.com</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 bg-card rounded-lg shadow-md">
              <MapPin className="h-12 w-12 text-accent mb-4" />
              <h3 className="text-xl font-semibold mb-2">Ubicación</h3>
              <p className="text-muted-foreground">Ciudad, Estado</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground/5 py-8 px-6 border-t">
        <div className="max-w-7xl mx-auto text-center text-muted-foreground">
          <p>&copy; 2024 Productos Frescos. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
