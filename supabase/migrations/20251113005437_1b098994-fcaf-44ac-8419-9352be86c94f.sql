-- Add discount_percentage column to products table
ALTER TABLE products ADD COLUMN discount_percentage integer;

-- Add comment to describe the column
COMMENT ON COLUMN products.discount_percentage IS 'Percentage discount for the product (e.g., 20 for 20% off)';