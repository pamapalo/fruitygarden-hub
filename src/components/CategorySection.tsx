import { Card } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface CategorySectionProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: "primary" | "secondary" | "accent" | "pink";
}

const CategorySection = ({ title, description, icon: Icon, color }: CategorySectionProps) => {
  const colorClasses = {
    primary: "bg-primary/10 hover:bg-primary/20 border-primary/30",
    secondary: "bg-secondary/10 hover:bg-secondary/20 border-secondary/30",
    accent: "bg-accent/10 hover:bg-accent/20 border-accent/30",
    pink: "bg-pink/10 hover:bg-pink/20 border-pink/30",
  };

  const iconColors = {
    primary: "text-primary",
    secondary: "text-secondary",
    accent: "text-accent",
    pink: "text-pink",
  };

  return (
    <Card className={`p-8 transition-all duration-300 cursor-pointer border-2 ${colorClasses[color]}`}>
      <div className="flex flex-col items-center text-center space-y-4">
        <div className={`p-4 rounded-full bg-card shadow-md ${iconColors[color]}`}>
          <Icon className="h-12 w-12" />
        </div>
        <h3 className="text-2xl font-bold">{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </Card>
  );
};

export default CategorySection;
