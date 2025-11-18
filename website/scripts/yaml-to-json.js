#!/usr/bin/env node

/**
 * YAML to JSON Build Script
 *
 * Converts YAML dataset files to optimized JSON format:
 * 1. datasets-cards.json: Lightweight index with card data only (~10-15KB)
 * 2. Individual dataset JSON files with full details (~8-10KB each)
 *
 * This enables lazy loading: load cards first, then full details on demand.
 */

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Paths
const DATASETS_DIR = path.join(__dirname, '../data/datasets');
const OUTPUT_DIR = path.join(__dirname, '../data');
const CARDS_OUTPUT = path.join(OUTPUT_DIR, 'datasets-cards.json');

console.log('🚀 Starting YAML to JSON conversion...\n');

// Read all YAML files
const yamlFiles = fs.readdirSync(DATASETS_DIR)
  .filter(file => file.endsWith('.yaml') && !file.startsWith('_'))
  .sort();

console.log(`📁 Found ${yamlFiles.length} dataset files:`);
yamlFiles.forEach(file => console.log(`   - ${file}`));
console.log('');

// Arrays to store data
const datasetCards = [];
let totalCardSize = 0;
let totalFullSize = 0;

// Process each YAML file
yamlFiles.forEach(yamlFile => {
  const yamlPath = path.join(DATASETS_DIR, yamlFile);
  const yamlContent = fs.readFileSync(yamlPath, 'utf8');

  try {
    // Parse YAML
    const dataset = yaml.load(yamlContent);

    // Extract card data only (lightweight)
    const cardData = {
      id: dataset.id,
      title: dataset.title,
      subtitle: dataset.subtitle,
      category: dataset.category,
      card: dataset.card
    };

    datasetCards.push(cardData);

    // Calculate sizes
    const cardJson = JSON.stringify(cardData, null, 2);
    const fullJson = JSON.stringify(dataset, null, 2);
    totalCardSize += cardJson.length;
    totalFullSize += fullJson.length;

    // Write full dataset JSON
    const jsonFileName = `${dataset.id}.json`;
    const jsonPath = path.join(DATASETS_DIR, jsonFileName);
    fs.writeFileSync(jsonPath, fullJson);

    console.log(`✅ ${dataset.id.padEnd(20)} Card: ${(cardJson.length / 1024).toFixed(1)}KB  Full: ${(fullJson.length / 1024).toFixed(1)}KB`);

  } catch (error) {
    console.error(`❌ Error processing ${yamlFile}:`, error.message);
  }
});

// Sort cards by category and title for consistent ordering
datasetCards.sort((a, b) => {
  if (a.category !== b.category) {
    return a.category.localeCompare(b.category);
  }
  return a.title.localeCompare(b.title);
});

// Write cards JSON
const cardsJson = JSON.stringify(datasetCards, null, 2);
fs.writeFileSync(CARDS_OUTPUT, cardsJson);

// Summary
console.log('\n📊 Build Summary:');
console.log('─'.repeat(60));
console.log(`✅ Generated datasets-cards.json: ${(cardsJson.length / 1024).toFixed(1)}KB`);
console.log(`✅ Generated ${yamlFiles.length} individual dataset JSON files`);
console.log(`📦 Total card data size: ${(totalCardSize / 1024).toFixed(1)}KB`);
console.log(`📦 Total full data size: ${(totalFullSize / 1024).toFixed(1)}KB`);
console.log(`🚀 Performance gain: ${((1 - (totalCardSize / totalFullSize)) * 100).toFixed(0)}% reduction in initial load`);
console.log('─'.repeat(60));

// Write build metadata
const metadata = {
  buildDate: new Date().toISOString(),
  datasetsCount: yamlFiles.length,
  cardsFileSize: cardsJson.length,
  totalFullSize: totalFullSize,
  performanceGain: `${((1 - (totalCardSize / totalFullSize)) * 100).toFixed(0)}%`,
  datasets: datasetCards.map(d => ({
    id: d.id,
    title: d.title,
    category: d.category
  }))
};

fs.writeFileSync(
  path.join(OUTPUT_DIR, 'build-metadata.json'),
  JSON.stringify(metadata, null, 2)
);

console.log('\n✅ Build complete! Files generated:');
console.log(`   📄 ${CARDS_OUTPUT}`);
console.log(`   📄 ${OUTPUT_DIR}/build-metadata.json`);
console.log(`   📁 ${DATASETS_DIR}/*.json (${yamlFiles.length} files)\n`);
