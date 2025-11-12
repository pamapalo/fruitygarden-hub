-- Create products table
CREATE TABLE public.products (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  price TEXT NOT NULL,
  category TEXT NOT NULL CHECK (category IN ('fruits', 'vegetables', 'others')),
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow everyone to view products (public facing)
CREATE POLICY "Anyone can view products" 
ON public.products 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to insert products (for demo purposes)
-- In production, you'd want to restrict this to authenticated users/admins
CREATE POLICY "Anyone can insert products" 
ON public.products 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow anyone to update products
CREATE POLICY "Anyone can update products" 
ON public.products 
FOR UPDATE 
USING (true);

-- Create policy to allow anyone to delete products
CREATE POLICY "Anyone can delete products" 
ON public.products 
FOR DELETE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Insert some sample products
INSERT INTO public.products (name, description, price, category) VALUES
('Fresas Frescas', 'Fresas dulces y jugosas, recién cosechadas', '$4.99/lb', 'fruits'),
('Arándanos Premium', 'Arándanos seleccionados de alta calidad', '$6.99/lb', 'fruits'),
('Naranjas Jugosas', 'Cítricos frescos con alto contenido de vitamina C', '$3.99/lb', 'fruits'),
('Limones Frescos', 'Limones perfectos para jugos y cocina', '$2.99/lb', 'fruits'),
('Lechuga Orgánica', 'Lechuga fresca cultivada sin pesticidas', '$2.99/unidad', 'vegetables'),
('Cebollas Moradas', 'Cebollas frescas ideales para ensaladas', '$2.49/lb', 'vegetables'),
('Remolachas', 'Remolachas nutritivas y sabrosas', '$3.49/lb', 'vegetables'),
('Tomates Cherry', 'Tomates pequeños y dulces', '$4.99/lb', 'vegetables');