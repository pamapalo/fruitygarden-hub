-- Add original_price column to products table
ALTER TABLE products ADD COLUMN original_price text;

-- Add comment to describe the column
COMMENT ON COLUMN products.original_price IS 'Original price before discount (for offers)';