const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://flrcwmmdveylmcbjuwfc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmN3bW1kdmV5bG1jYmp1d2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk2MjIsImV4cCI6MjA3MTQzNTYyMn0.NitC7tHaImTORdaKgCFXkKRLNMOxJCuBbTDAyr8AVa0'
);

async function checkProducts() {
  try {
    console.log('🔍 Checking products in database...');
    
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('hidden_on_home', false)
      .order('id', { ascending: true });

    if (error) {
      console.error('❌ Error:', error);
      return;
    }

    console.log(`✅ Found ${data.length} products:`);
    console.log('\n📦 Product Details:');
    
    data.forEach(product => {
      console.log(`\nID: ${product.id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Price: Rs ${product.price}`);
      console.log(`Original Price: Rs ${product.original_price}`);
      console.log(`Discount: ${product.discount}%`);
      console.log(`In Stock: ${product.in_stock}`);
      console.log('---');
    });

  } catch (error) {
    console.error('❌ Error checking products:', error);
  }
}

checkProducts();
