// scripts/test-setup.js
const path = require('path');
const fs = require('fs');

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length) {
        process.env[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  console.log('✅ Environment variables loaded from .env.local');
} else {
  console.log('❌ .env.local file not found');
}

// Import modules after env is loaded
let createClient, Stripe;

try {
  createClient = require('@supabase/supabase-js').createClient;
  Stripe = require('stripe');
  console.log('✅ Required modules loaded successfully');
} catch (err) {
  console.log('❌ Failed to load modules. Please install dependencies:');
  console.log('   npm install @supabase/supabase-js stripe');
  process.exit(1);
}

// Your price mapping (update with actual price IDs)
const PRICE_TO_FILE = {
  "price_1RvcFhHV3EX6m1vfBFokvpeW": {
    bucket: "marrakech-trip",
    path: "travel book marrakech.pdf",
    title: "Pocket Marrakesh – Insider City Guide",
  },
  "price_1RvjApHV3EX6m1vfWLbCl21B": {
    bucket: "female-traveler", 
    path: "women-guide.pdf",
    title: "Solo Female Travel in Morocco",
  }
};

async function testEnvironmentVariables() {
  console.log('\n🔧 Checking environment variables...');
  
  const requiredVars = [
    'NEXT_PUBLIC_SUPABASE_URL',
    'SUPABASE_SERVICE_ROLE_KEY', 
    'STRIPE_SECRET_KEY',
    'NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY'
  ];
  
  let allPresent = true;
  
  requiredVars.forEach(varName => {
    const value = process.env[varName];
    if (value && value.length > 10) {
      console.log(`✅ ${varName} - Set (${value.substring(0, 20)}...)`);
    } else if (value) {
      console.log(`⚠️  ${varName} - Set but seems short`);
    } else {
      console.log(`❌ ${varName} - Missing`);
      allPresent = false;
    }
  });
  
  return allPresent;
}

async function testSupabaseConnection() {
  console.log('\n🔧 Testing Supabase connection...');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('❌ Supabase environment variables missing');
    return false;
  }

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    const { data, error } = await supabase.storage.listBuckets();
    
    if (error) {
      console.error('❌ Supabase connection failed:', error.message);
      return false;
    }
    
    console.log('✅ Supabase connected successfully');
    console.log('📦 Available buckets:', data.map(b => b.name).join(', '));
    
    // Check if required buckets exist
    const bucketNames = data.map(b => b.name);
    const requiredBuckets = ['marrakech-trip', 'female-traveler'];
    
    requiredBuckets.forEach(bucket => {
      if (bucketNames.includes(bucket)) {
        console.log(`✅ Bucket '${bucket}' exists`);
      } else {
        console.log(`❌ Bucket '${bucket}' missing - please create it in Supabase Dashboard`);
      }
    });
    
    return true;
  } catch (err) {
    console.error('❌ Supabase connection error:', err.message);
    return false;
  }
}

async function testStripeConnection() {
  console.log('\n🔧 Testing Stripe connection...');
  
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log('❌ STRIPE_SECRET_KEY environment variable missing');
    return false;
  }

  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { 
      apiVersion: '2024-06-20' 
    });

    const account = await stripe.accounts.retrieve();
    console.log('✅ Stripe connected successfully');
    console.log('🏪 Account ID:', account.id);
    console.log('📊 Account type:', account.type);
    return true;
  } catch (err) {
    console.error('❌ Stripe connection failed:', err.message);
    if (err.message.includes('Invalid API Key')) {
      console.log('💡 Make sure you\'re using the SECRET key (starts with sk_)');
    }
    return false;
  }
}

async function checkFiles() {
  console.log('\n🔧 Checking uploaded files...');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('❌ Supabase environment variables missing');
    return false;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  for (const [priceId, config] of Object.entries(PRICE_TO_FILE)) {
    console.log(`\n📋 Checking: ${config.title}`);
    console.log(`   Bucket: ${config.bucket}`);
    console.log(`   Path: ${config.path}`);
    
    try {
      // List files in bucket
      const { data: files, error } = await supabase.storage
        .from(config.bucket)
        .list('', { search: config.path.split('/').pop() });
      
      if (error) {
        console.log(`   ❌ Error accessing bucket: ${error.message}`);
        continue;
      }
      
      const fileExists = files && files.length > 0;
      if (fileExists) {
        console.log(`   ✅ File found: ${files[0].name}`);
        if (files[0].metadata?.size) {
          console.log(`   📏 Size: ${(files[0].metadata.size / 1024 / 1024).toFixed(2)} MB`);
        }
      } else {
        console.log(`   ❌ File not found - please upload it to Supabase Storage`);
      }
      
    } catch (err) {
      console.log(`   ❌ Error: ${err.message}`);
    }
  }
  
  return true;
}

async function testSignedUrls() {
  console.log('\n🔧 Testing signed URL generation...');
  
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.log('❌ Supabase environment variables missing');
    return false;
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY
  );
  
  const firstConfig = Object.values(PRICE_TO_FILE)[0];
  
  try {
    const { data, error } = await supabase.storage
      .from(firstConfig.bucket)
      .createSignedUrl(firstConfig.path, 60, { download: true });
    
    if (error) {
      console.log('❌ Signed URL generation failed:', error.message);
      return false;
    }
    
    console.log('✅ Signed URL generated successfully');
    console.log('🔗 URL preview:', data.signedUrl.substring(0, 80) + '...');
    return true;
  } catch (err) {
    console.log('❌ Signed URL error:', err.message);
    return false;
  }
}

async function checkStripeProducts() {
  console.log('\n🔧 Checking Stripe products and prices...');
  
  if (!process.env.STRIPE_SECRET_KEY) {
    console.log('❌ STRIPE_SECRET_KEY environment variable missing');
    return false;
  }

  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, { 
    apiVersion: '2024-06-20' 
  });
  
  try {
    const products = await stripe.products.list({ limit: 20 });
    const prices = await stripe.prices.list({ limit: 20 });
    
    console.log('\n📦 Your Stripe Products:');
    if (products.data.length === 0) {
      console.log('   No products found - you need to create them in Stripe Dashboard');
    } else {
      products.data.forEach(product => {
        console.log(`   - ${product.name} (${product.id})`);
      });
    }
    
    console.log('\n💰 Your Stripe Prices:');
    if (prices.data.length === 0) {
      console.log('   No prices found - you need to create them in Stripe Dashboard');
    } else {
      prices.data.forEach(price => {
        const configured = PRICE_TO_FILE[price.id] ? '✅ Configured' : '❌ Not configured';
        const amount = price.unit_amount ? `${price.unit_amount/100} ${price.currency.toUpperCase()}` : 'No amount';
        console.log(`   ${price.id} - ${amount} ${configured}`);
      });
    }
    
    // Check if our configured prices exist
    console.log('\n🔍 Checking configured price IDs:');
    for (const priceId of Object.keys(PRICE_TO_FILE)) {
      const exists = prices.data.some(p => p.id === priceId);
      if (exists) {
        console.log(`   ✅ ${priceId} - Found in Stripe`);
      } else {
        console.log(`   ❌ ${priceId} - Not found in Stripe (update with real Price ID)`);
      }
    }
    
    return true;
  } catch (err) {
    console.log('❌ Stripe products check failed:', err.message);
    return false;
  }
}

// Main test runner
async function runAllTests() {
  console.log('🚀 Moroccan Advisor Download System Test\n');
  console.log('='.repeat(60));
  
  const tests = [
    { name: 'Environment Variables', fn: testEnvironmentVariables },
    { name: 'Supabase Connection', fn: testSupabaseConnection },
    { name: 'Stripe Connection', fn: testStripeConnection },
    { name: 'File Uploads Check', fn: checkFiles },
    { name: 'Signed URL Generation', fn: testSignedUrls },
    { name: 'Stripe Products Check', fn: checkStripeProducts },
  ];
  
  const results = [];
  
  for (const test of tests) {
    try {
      const result = await test.fn();
      results.push({ name: test.name, success: result });
    } catch (err) {
      console.error(`❌ Test '${test.name}' failed:`, err.message);
      results.push({ name: test.name, success: false, error: err.message });
    }
  }
  
  // Summary
  console.log('\n' + '='.repeat(60));
  console.log('📊 TEST SUMMARY');
  console.log('='.repeat(60));
  
  const passed = results.filter(r => r.success).length;
  const failed = results.length - passed;
  
  results.forEach(result => {
    const status = result.success ? '✅' : '❌';
    console.log(`${status} ${result.name}`);
  });
  
  console.log(`\n🎯 Results: ${passed} passed, ${failed} failed`);
  
  if (failed === 0) {
    console.log('\n🎉 All tests passed! Your download system looks ready!');
    console.log('\n📝 Next steps:');
    console.log('   1. Start your dev server: npm run dev');
    console.log('   2. Test a purchase with Stripe test card: 4242 4242 4242 4242');
    console.log('   3. Verify the download flow works end-to-end');
  } else {
    console.log('\n⚠️  Some tests failed. Please fix the issues above.');
    console.log('\n🔧 Common fixes:');
    console.log('   - Check your .env.local file has all required variables');
    console.log('   - Make sure Supabase buckets are created and files uploaded');
    console.log('   - Verify Stripe products and prices are set up correctly');
    console.log('   - Update PRICE_TO_FILE with your actual Stripe Price IDs');
  }
  
  console.log('\n📚 Setup Guide: https://docs.stripe.com/payments/checkout');
  console.log('📚 Supabase Storage: https://supabase.com/docs/guides/storage');
}

// Run the tests
runAllTests().catch(err => {
  console.error('Fatal error:', err.message);
  process.exit(1);
});