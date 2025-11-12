import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface CategorySectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "pink";
  link: string;
}

const CategorySection = ({ title, description, icon: Icon, color, link }: CategorySectionProps) => {
  const navigate = useNavigate();
  
  const colorClasses = {
    primary: "bg-gradient-to-br from-primary/10 to-primary/5 hover:from-primary/20 hover:to-primary/10 border-primary/40 group-hover:border-primary shadow-primary/20",
    secondary: "bg-gradient-to-br from-secondary/10 to-secondary/5 hover:from-secondary/20 hover:to-secondary/10 border-secondary/40 group-hover:border-secondary shadow-secondary/20",
    accent: "bg-gradient-to-br from-accent/10 to-accent/5 hover:from-accent/20 hover:to-accent/10 border-accent/40 group-hover:border-accent shadow-accent/20",
    pink: "bg-gradient-to-br from-pink/10 to-pink/5 hover:from-pink/20 hover:to-pink/10 border-pink/40 group-hover:border-pink shadow-pink/20",
  };

  const iconColors = {
    primary: "text-primary group-hover:scale-110",
    secondary: "text-secondary group-hover:scale-110",
    accent: "text-accent group-hover:scale-110",
    pink: "text-pink group-hover:scale-110",
  };

  const bgColors = {
    primary: "bg-primary/10 group-hover:bg-primary/20",
    secondary: "bg-secondary/10 group-hover:bg-secondary/20",
    accent: "bg-accent/10 group-hover:bg-accent/20",
    pink: "bg-pink/10 group-hover:bg-pink/20",
  };

  return (
    <Card 
      className={`group p-10 transition-all duration-500 cursor-pointer border-2 ${colorClasses[color]} hover:shadow-2xl hover:scale-105 hover:-translate-y-2 relative overflow-hidden`}
      onClick={() => navigate(link)}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-foreground/5 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-500"></div>
      
      <div className="flex flex-col items-center text-center space-y-6 relative z-10">
        <div className={`p-6 rounded-2xl ${bgColors[color]} shadow-lg transition-all duration-300 ${iconColors[color]}`}>
          <Icon className="h-16 w-16 transition-transform duration-300" />
        </div>
        
        <h3 className="text-3xl font-black group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-muted-foreground text-lg font-medium">{description}</p>
        
        <div className="flex items-center gap-2 text-sm font-bold text-primary opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-2">
          <span>Ver Productos</span>
          <ArrowRight className="h-4 w-4" />
        </div>
      </div>
    </Card>
  );
};

export default CategorySection;
