import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rqxpagxyhilnfwxfunfo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_v8wzVNVTKWPtE4W-koLpcA_XFjduxM1';
const BUCKET = 'sanjay-pansari-products-images';
const PRODUCTS_IMG_DIR = '/Users/manojchauhan/SanjayPansari content/products';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Product data extracted from images
const products = [
  {
    name: 'Full Count 60 Capsule',
    slug: 'full-count-60-capsule',
    description: 'Ayurvedic capsules to support healthy sperm count and quality. 100% natural and Ayurvedic formula with no side effects.',
    benefits: 'Improves sperm motility & quality. Increases sperm count. Boosts stamina and energy. Supports active sperm production.',
    how_to_use: 'Take as directed by your physician. Consult Dr. Sanjay Pansari for personalized dosage.',
    base_price: 6000,
    base_mrp: 8400,
    badges: ['100% Ayurvedic', 'No Side Effects'],
    image_file: 'img1.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Slimo Powder',
    slug: 'slimo-powder',
    description: 'Ayurvedic and safe solution for weight loss. Shape your body naturally with this powerful herbal formula.',
    benefits: 'Lose 3-4 kg weight per month. Reduces belly fat. Shapes body naturally. Supports fat burning. Boosts metabolism. 100% Ayurvedic ingredients.',
    how_to_use: 'Mix as directed and consume as prescribed by your physician.',
    base_price: 2000,
    base_mrp: 3490,
    badges: ['100% Ayurvedic', 'No Side Effects'],
    image_file: 'img2.jpeg',
    category_name: 'Weight Management',
  },
  {
    name: 'Majun 10 Days',
    slug: 'majun-10-days',
    description: 'Ayurvedic Majun for complete mens health. Natural solution made from herbal ingredients — safe, effective and 100% Ayurvedic.',
    benefits: 'Improves sexual life. Addresses erection issues. Improves timing. Increases sperm count. Energy increase. Stamina booster. Improves vitality.',
    how_to_use: 'Take as directed by your physician. 10-day course.',
    base_price: 2000,
    base_mrp: 2500,
    badges: ['100% Ayurvedic', 'No Side Effects'],
    image_file: 'img6.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Majun 15 Days',
    slug: 'majun-15-days',
    description: 'Ayurvedic Majun for complete mens health. Natural solution made from herbal ingredients — safe, effective and 100% Ayurvedic.',
    benefits: 'Improves sexual life. Addresses erection issues. Improves timing. Increases sperm count. Energy increase. Stamina booster. Improves vitality.',
    how_to_use: 'Take as directed by your physician. 15-day course.',
    base_price: 3000,
    base_mrp: 3750,
    badges: ['100% Ayurvedic', 'No Side Effects'],
    image_file: 'img3.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Majun 60 Days',
    slug: 'majun-60-days',
    description: 'Ayurvedic Majun for complete mens health. Natural solution made from herbal ingredients — safe, effective and 100% Ayurvedic.',
    benefits: 'Improves sexual life. Addresses erection issues. Improves timing. Increases sperm count. Energy increase. Stamina booster. Improves vitality.',
    how_to_use: 'Take as directed by your physician. 60-day course for best results.',
    base_price: 12000,
    base_mrp: 15000,
    badges: ['100% Ayurvedic', 'No Side Effects', 'Best Value'],
    image_file: 'img7.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Sharbat Aloo Bukhara',
    slug: 'sharbat-aloo-bukhara',
    description: 'Natural Ayurvedic sharbat for liver health and cooling. Made from plum (aloo bukhara) — pure, sweet and beneficial.',
    benefits: 'Reduces liver heat. Reduces stomach heat. Reduces elevated SGOT/SGPT levels. Natural and herbal.',
    how_to_use: 'Take as directed. Mix with water or consume directly as prescribed.',
    base_price: 800,
    base_mrp: 1200,
    badges: ['100% Natural', 'Herbal'],
    image_file: 'img4.jpeg',
    category_name: 'Liver Health',
  },
  {
    name: 'Jigar Amrit',
    slug: 'jigar-amrit',
    description: 'Ayurvedic solution for all liver problems. Made from pure Ayurvedic herbs to make your liver healthy and bring new energy to life.',
    benefits: 'Treats Fatty Liver Grade 1, 2, 3. Treats Hepatitis A, B, C, D, E. Treats Kala Piliya (Jaundice). Treats Sadaran Piliya. Treats all liver diseases. Detoxifies liver. Improves digestion. Boosts energy. Improves immunity.',
    how_to_use: 'Take as directed by your physician.',
    base_price: 1500,
    base_mrp: 1900,
    badges: ['100% Ayurvedic', 'Liver Care'],
    image_file: 'img8.jpeg',
    category_name: 'Liver Health',
  },
  {
    name: 'Achook 10 Capsule',
    slug: 'achook-10-capsule',
    description: 'Ayurvedic capsule for complete mens health — natural power, stamina and confidence. Be stronger, last longer.',
    benefits: 'Increases strength. Boosts stamina. Improves performance. Restores lost power. 100% Ayurvedic. No side effects.',
    how_to_use: 'Take as directed by your physician. 10-capsule pack.',
    base_price: 2000,
    base_mrp: 3450,
    badges: ['100% Ayurvedic', 'No Side Effects'],
    image_file: 'img9.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Achook 30 Capsule',
    slug: 'achook-30-capsule',
    description: 'Ayurvedic capsule for complete mens health — natural power, stamina and confidence. Be stronger, last longer.',
    benefits: 'Increases strength. Boosts stamina. Improves performance. Restores lost power. 100% Ayurvedic. No side effects.',
    how_to_use: 'Take as directed by your physician. 30-capsule pack for extended results.',
    base_price: 6000,
    base_mrp: 8400,
    badges: ['100% Ayurvedic', 'No Side Effects', 'Best Value'],
    image_file: 'img5.jpeg',
    category_name: 'Mens Health',
  },
  {
    name: 'Shaurya Swarnprash',
    slug: 'shaurya-swarnprash',
    description: 'Premium Ayurvedic tonic enriched with Kashmiri Kesar and Chandi (Silver). Formulated with Rajat Bhasma — the finest Ayurvedic tonic for strength, immunity and complete development.',
    benefits: 'Physical strength and energy. Memory and intelligence development. Boosts immunity. Reduces mental stress. Aids physical and mental development of children.',
    how_to_use: 'Take as directed. Consume with milk for best results. Consult physician for dosage.',
    base_price: 15000,
    base_mrp: 17000,
    badges: ['Pure Gold', 'Kashmiri Kesar', 'Premium', '100% Ayurvedic'],
    image_file: 'img11.jpeg',
    category_name: 'General Wellness',
  },
];

async function getOrCreateCategory(name) {
  const slug = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');

  const { data: existing } = await supabase
    .from('categories')
    .select('id, name')
    .ilike('name', name)
    .single();

  if (existing) {
    console.log(`  Category exists: ${name} (${existing.id})`);
    return existing.id;
  }

  const { data: created, error } = await supabase
    .from('categories')
    .insert([{ name, slug }])
    .select()
    .single();

  if (error) {
    console.error(`  Failed to create category ${name}:`, error.message);
    return null;
  }

  console.log(`  Created category: ${name} (${created.id})`);
  return created.id;
}

async function uploadImage(filename) {
  const filePath = path.join(PRODUCTS_IMG_DIR, filename);
  const fileBuffer = fs.readFileSync(filePath);
  const storagePath = `products/${Date.now()}-${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: false });

  if (error) {
    console.error(`  Image upload failed for ${filename}:`, error.message);
    return null;
  }

  const { data: { publicUrl } } = supabase.storage.from(BUCKET).getPublicUrl(storagePath);
  console.log(`  Uploaded image: ${filename} → ${publicUrl}`);
  return publicUrl;
}

async function main() {
  console.log('Signing in as admin...');
  const { data: authData, error: authError } = await supabase.auth.signInWithPassword({
    email: 'chauhanmanoj16358@gmail.com',
    password: 'Chauhanrana@123',
  });
  if (authError) {
    console.error('Auth failed:', authError.message);
    process.exit(1);
  }
  console.log('Signed in:', authData.user.email, '\n');

  console.log('Starting product seeding...\n');

  for (const product of products) {
    console.log(`\nProcessing: ${product.name}`);

    // Check if product already exists
    const { data: existing } = await supabase
      .from('products')
      .select('id')
      .eq('slug', product.slug)
      .single();

    if (existing) {
      console.log(`  Skipping — already exists (id: ${existing.id})`);
      continue;
    }

    // Get or create category
    const categoryId = await getOrCreateCategory(product.category_name);

    // Upload image
    const imageUrl = await uploadImage(product.image_file);

    // Insert product
    const { data: inserted, error } = await supabase
      .from('products')
      .insert([{
        name: product.name,
        slug: product.slug,
        description: product.description,
        benefits: product.benefits,
        how_to_use: product.how_to_use,
        base_price: product.base_price,
        base_mrp: product.base_mrp,
        badges: product.badges,
        image_url: imageUrl,
        category_ids: categoryId ? [categoryId] : [],
      }])
      .select()
      .single();

    if (error) {
      console.error(`  Insert failed:`, error.message);
    } else {
      console.log(`  Inserted product: ${product.name} (id: ${inserted.id})`);
    }
  }

  console.log('\nDone!');
}

main().catch(console.error);
