import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

const SUPABASE_URL = 'https://rqxpagxyhilnfwxfunfo.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_v8wzVNVTKWPtE4W-koLpcA_XFjduxM1';
const BUCKET = 'sanjay-pansari-products-images';
const IMAGES_DIR = '/Users/manojchauhan/SanjayPansari content/products/images';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Best matching image from images/ folder for each category
const categoryImages = [
  { namePattern: 'mens health',       file: 'img8.jpeg'  }, // Achook capsule — men's health
  { namePattern: 'liver health',      file: 'img4.jpeg'  }, // Jigar Amrit — liver
  { namePattern: 'weight management', file: 'img2.jpeg'  }, // Slimo — weight loss
  { namePattern: 'general wellness',  file: 'img7.jpeg'  }, // Shaurya Swarnprash — wellness
];

async function uploadImage(filename) {
  const filePath = path.join(IMAGES_DIR, filename);
  const fileBuffer = fs.readFileSync(filePath);
  const storagePath = `categories/cat-${Date.now()}-${filename}`;

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(storagePath, fileBuffer, { contentType: 'image/jpeg', upsert: false });

  if (error) { console.error(`  Upload failed:`, error.message); return null; }

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

  const { data: categories } = await supabase.from('categories').select('id, name, image_url');
  if (!categories?.length) { console.log('No categories found.'); return; }

  for (const cat of categories) {
    const match = categoryImages.find(c => cat.name.toLowerCase().includes(c.namePattern));
    if (!match) { console.log(`No image mapping for: ${cat.name}`); continue; }

    if (cat.image_url) {
      console.log(`Skipping ${cat.name} — already has image`);
      continue;
    }

    console.log(`Uploading image for: ${cat.name} (${match.file})`);
    const url = await uploadImage(match.file);
    if (!url) continue;

    const { error } = await supabase.from('categories').update({ image_url: url }).eq('id', cat.id);
    if (error) console.error(`  Update failed:`, error.message);
    else console.log(`  Set image for ${cat.name}`);
  }

  console.log('\nDone!');
}

main().catch(console.error);
