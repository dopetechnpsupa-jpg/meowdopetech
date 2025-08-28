const { createClient } = require('@supabase/supabase-js');

const supabase = createClient(
  'https://flrcwmmdveylmcbjuwfc.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZscmN3bW1kdmV5bG1jYmp1d2ZjIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU4NTk2MjIsImV4cCI6MjA3MTQzNTYyMn0.NitC7tHaImTORdaKgCFXkKRLNMOxJCuBbTDAyr8AVa0'
);

async function fixProductPricing() {
  try {
    console.log('🔧 Fixing product pricing issues...');
    
    // Fix AK 820 keyboard pricing
    console.log('\n📝 Updating AK 820 keyboard...');
    const { error: error1 } = await supabase
      .from('products')
      .update({
        original_price: 12999,
        price: 8999,
        discount: 31
      })
      .eq('id', 73)
      .eq('name', 'AK 820');

    if (error1) {
      console.error('❌ Error updating AK 820:', error1);
    } else {
      console.log('✅ AK 820 updated successfully');
    }

    // Fix Ajazz keyboard pricing
    console.log('\n📝 Updating Ajazz keyboard...');
    const { error: error2 } = await supabase
      .from('products')
      .update({
        original_price: 4999,
        price: 3500,
        discount: 30
      })
      .eq('id', 74)
      .eq('name', 'Ajazz');

    if (error2) {
      console.error('❌ Error updating Ajazz:', error2);
    } else {
      console.log('✅ Ajazz updated successfully');
    }

    // Fix asdasds product pricing
    console.log('\n📝 Updating asdasds product...');
    const { error: error3 } = await supabase
      .from('products')
      .update({
        original_price: 2999,
        price: 2222,
        discount: 26
      })
      .eq('id', 78)
      .eq('name', 'asdasds');

    if (error3) {
      console.error('❌ Error updating asdasds:', error3);
    } else {
      console.log('✅ asdasds updated successfully');
    }

    // Verify the changes
    console.log('\n🔍 Verifying changes...');
    const { data, error: verifyError } = await supabase
      .from('products')
      .select('id, name, price, original_price, discount')
      .in('id', [73, 74, 78])
      .order('id');

    if (verifyError) {
      console.error('❌ Error verifying changes:', verifyError);
      return;
    }

    console.log('\n📦 Updated Product Details:');
    data.forEach(product => {
      const calculatedDiscount = Math.round(((product.original_price - product.price) / product.original_price) * 100);
      console.log(`\nID: ${product.id}`);
      console.log(`Name: ${product.name}`);
      console.log(`Price: Rs ${product.price}`);
      console.log(`Original Price: Rs ${product.original_price}`);
      console.log(`Discount: ${product.discount}%`);
      console.log(`Calculated Discount: ${calculatedDiscount}%`);
      console.log('---');
    });

    console.log('\n✅ Product pricing fixes completed!');

  } catch (error) {
    console.error('❌ Error fixing product pricing:', error);
  }
}

fixProductPricing();
