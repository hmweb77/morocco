// src/lib/ebooks.js

// Map Stripe Price IDs to downloadable files
export const PRICE_TO_FILE = {
  // Individual Products - Update these with your actual Stripe Price IDs
  "price_1RvcFhHV3EX6m1vfBFokvpeW": {
    bucket: "marrakech-trip",
    path: "travel book marrakech.pdf",
    title: "Pocket Marrakesh – Insider City Guide",
    description: "Your hyper-local guide to the Red City",
    category: "city-guide"
  },
  
  "price_1RvjApHV3EX6m1vfWLbCl21B": {
    bucket: "female-traveler", 
    path: "women-guide.pdf",
    title: "Solo Female Travel in Morocco",
    description: "Travel with confidence and safety",
    category: "safety-culture"
  },

  // Bundle Product - Update with your actual bundle Price ID
  "price_bundle_complete_morocco": {
    bucket: "marrakech-trip",
    path: "travel book marrakech.pdf",
    title: "Complete Morocco Travel Bundle",
    description: "Everything you need for the perfect Moroccan adventure",
    category: "bundle",
    isBundle: true,
    additionalFiles: [
      {
        bucket: "female-traveler",
        path: "women-guide.pdf", 
        title: "Solo Female Travel in Morocco",
        description: "Bonus guide included in bundle"
      }
    ]
  }
};

// Helper function to get file config by price ID
export function getFileConfigByPriceId(priceId) {
  return PRICE_TO_FILE[priceId] || null;
}

// Helper function to check if a price ID is for a bundle
export function isBundle(priceId) {
  const config = PRICE_TO_FILE[priceId];
  return config?.isBundle || false;
}

// Get all files for a given price ID (handles both single files and bundles)
export function getAllFilesForPriceId(priceId) {
  const config = PRICE_TO_FILE[priceId];
  if (!config) return [];

  const files = [config];
  
  if (config.isBundle && config.additionalFiles) {
    files.push(...config.additionalFiles);
  }

  return files;
}

// Validation function to check if all required files exist
export async function validateFileAccess(supabaseClient, priceId) {
  const files = getAllFilesForPriceId(priceId);
  const validationResults = [];

  for (const file of files) {
    try {
      const { data, error } = await supabaseClient.storage
        .from(file.bucket)
        .list('', { search: file.path.split('/').pop() });

      validationResults.push({
        file: file.title,
        exists: !error && data?.length > 0,
        error: error?.message
      });
    } catch (err) {
      validationResults.push({
        file: file.title,
        exists: false,
        error: err.message
      });
    }
  }

  return validationResults;
}