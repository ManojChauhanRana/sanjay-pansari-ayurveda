import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rqxpagxyhilnfwxfunfo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_v8wzVNVTKWPtE4W-koLpcA_XFjduxM1';
const BUCKET = 'sanjay-pansari-products-images';
const IMAGES_DIR = '/Users/manojchauhan/SanjayPansari content/products/images';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Correct mapping: product slug → image file from images/ subfolder
// images/img1.jpeg  = Shaurya Swarnprash (actual product box)
// images/img2.jpeg  = Slimo Capsule banner
// images/img3.jpeg  = Majun banner
// images/img4.jpeg  = Jigar Amrit banner
// images/img5.jpeg  = Majun banner (same product, use img3)
// images/img6.jpeg  = Long Journey Capsule (NEW product)
// images/img7.jpeg  = Shaurya Swarnprash banner
// images/img8.jpeg  = Achook banner
// images/img9.jpeg  = Shaurya Swarnprash box (inside)
// images/img10.jpeg = Sharbat Aloo Bukhara banner
// images/WhatsApp Image... = Full Count 60 Capsule banner

const imageUpdates = [
  { slug: 'full-count-60-capsule',  file: 'WhatsApp Image 2026-06-18 at 23.17.13.jpeg' },
  { slug: 'slimo-powder',           file: 'img2.jpeg' },
  { slug: 'majun-10-days',          file: 'img3.jpeg' },
  { slug: 'majun-15-days',          file: 'img3.jpeg' },
  { slug: 'majun-60-days',          file: 'img3.jpeg' },
  { slug: 'sharbat-aloo-bukhara',   file: 'img10.jpeg' },
  { slug: 'jigar-amrit',            file: 'img4.jpeg' },
  { slug: 'achook-10-capsule',      file: 'img8.jpeg' },
  { slug: 'achook-30-capsule',      file: 'img8.jpeg' },
  { slug: 'shaurya-swarnprash',     file: 'img1.jpeg' },
];

// New product discovered in images folder
const newProduct = {
  name: 'Long Journey Capsule',
  slug: 'long-journey-capsule',
  description: 'Ayurvedic capsule for mens timing and confidence. 60-capsule pack from Sanjay Pansari Multispeciality Ayurvedic Hospital.',
  benefits: 'Helps support better timing & lasting. Helps reduce early fatigue. Boosts energy & confidence. Supports overall mens health.',
  how_to_use: 'Take as directed by your physician.',
  base_price: 2000,
  base_mrp: 3000,
  badges: ['100% Ayurvedic', 'No Side Effects'],
  image_file: 'img6.jpeg',
  category_name: 'Mens Health',
};

async function uploadImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  const fileBuffer = fs.readFileSync(filePath);
  const safeFileName = filename.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9.\-_]/g, '');
  const storagePath = `products/clean-${Date.now()}-${safeFileName}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: false });

  if (error) {
    console.error(`  Upload failed for ${filename}:`, error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  return publicUrl;
}

async function main() {
  console.log('Signing in...');
  const { error: authError } = await supabase.auth.signInWithPassword({
    email: 'chauhanmanoj16358@gmail.com',
    password: 'Chauhanrana@123',
  });
  if (authError) { console.error('Auth failed:', authError.message); process.exit(1); }
  console.log('Signed in.\n');

  // Cache uploaded URLs so same image file isn't uploaded twice
  const uploadedUrls = {};

  // 1. Update existing products with correct images
  console.log('=== Updating existing product images ===\n');
  for (const item of imageUpdates) {
    console.log(`Updating: ${item.slug}`);

    if (!uploadedUrls[item.file]) {
      console.log(`  Uploading ${item.file}...`);
      const url = await uploadImage(item.file);
      if (!url) continue;
      uploadedUrls[item.file] = url;
      console.log(`  Uploaded → ${url}`);
    } else {
      console.log(`  Reusing already-uploaded URL for ${item.file}`);
    }

    const { error } = await supabase
      .from('products')
      .update({ image_url: uploadedUrls[item.file] })
      .eq('slug', item.slug);

    if (error) {
      console.error(`  Update failed:`, error.message);
    } else {
      console.log(`  Updated image_url for ${item.slug}`);
    }
  }

  // 2. Add the new Long Journey Capsule product
  console.log('\n=== Adding new product: Long Journey Capsule ===\n');

  const { data: existing } = await supabase
    .from('products')
    .select('id')
    .eq('slug', newProduct.slug)
    .single();

  if (existing) {
    console.log('Long Journey Capsule already exists, skipping insert.');
  } else {
    // Get Men's Health category id
    const { data: cat } = await supabase
      .from('categories')
      .select('id')
      .ilike('name', 'Mens Health')
      .single();

    console.log(`Uploading image ${newProduct.image_file}...`);
    if (!uploadedUrls[newProduct.image_file]) {
      const url = await uploadImage(newProduct.image_file);
      if (url) uploadedUrls[newProduct.image_file] = url;
    }

    const { data: inserted, error } = await supabase
      .from('products')
      .insert([{
        name: newProduct.name,
        slug: newProduct.slug,
        description: newProduct.description,
        benefits: newProduct.benefits,
        how_to_use: newProduct.how_to_use,
        base_price: newProduct.base_price,
        base_mrp: newProduct.base_mrp,
        badges: newProduct.badges,
        image_url: uploadedUrls[newProduct.image_file] || null,
        category_ids: cat ? [cat.id] : [],
      }])
      .select()
      .single();

    if (error) {
      console.error('Insert failed:', error.message);
    } else {
      console.log(`Inserted: Long Journey Capsule (id: ${inserted.id})`);
    }
  }

  console.log('\nAll done!');
}

main().catch(console.error);
