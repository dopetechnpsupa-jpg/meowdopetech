-- Fix product pricing issues
-- Update AK 820 keyboard pricing
UPDATE products 
SET 
  original_price = 12999,
  price = 8999,
  discount = 31
WHERE id = 73 AND name = 'AK 820';

-- Update Ajazz keyboard pricing  
UPDATE products 
SET 
  original_price = 4999,
  price = 3500,
  discount = 30
WHERE id = 74 AND name = 'Ajazz';

-- Update asdasds product pricing
UPDATE products 
SET 
  original_price = 2999,
  price = 2222,
  discount = 26
WHERE id = 78 AND name = 'asdasds';

-- Verify the changes
SELECT 
  id,
  name,
  price,
  original_price,
  discount,
  ROUND(((original_price - price) / original_price * 100)::numeric, 0) as calculated_discount
FROM products 
WHERE id IN (73, 74, 78)
ORDER BY id;
