/**
 * Quick check to verify which locale files need translation
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const ENGLISH_DIR = path.join(LOCALES_DIR, 'en');

function checkFile(filePath, locale) {
  try {
    const content = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    // Check a few sample strings to see if they're in English
    let englishCount = 0;
    let totalStrings = 0;
    
    function countEnglish(obj) {
      if (typeof obj === 'string') {
        totalStrings++;
        // Simple heuristic: if it contains common English words, it's probably English
        const englishWords = ['the', 'and', 'for', 'with', 'your', 'you', 'this', 'that'];
        const lowerText = obj.toLowerCase();
        if (englishWords.some(word => lowerText.includes(` ${word} `))) {
          englishCount++;
        }
      } else if (Array.isArray(obj)) {
        obj.forEach(countEnglish);
      } else if (obj && typeof obj === 'object') {
        Object.values(obj).forEach(countEnglish);
      }
    }
    
    countEnglish(content.content);
    
    const percentEnglish = totalStrings > 0 ? (englishCount / totalStrings * 100).toFixed(1) : 0;
    
    return {
      locale,
      file: path.basename(filePath),
      totalStrings,
      englishCount,
      percentEnglish,
      needsTranslation: percentEnglish > 50
    };
  } catch (error) {
    return {
      locale,
      file: path.basename(filePath),
      error: error.message
    };
  }
}

function main() {
  console.log('🔍 Checking translation status...\n');
  
  // Get all locales
  const locales = fs.readdirSync(LOCALES_DIR)
    .filter(item => {
      const itemPath = path.join(LOCALES_DIR, item);
      return fs.statSync(itemPath).isDirectory() && item !== 'en';
    });
  
  const results = [];
  
  // Check each locale
  for (const locale of locales) {
    const localeDir = path.join(LOCALES_DIR, locale);
    const files = fs.readdirSync(localeDir).filter(f => f.endsWith('.content.json'));
    
    for (const file of files) {
      const filePath = path.join(localeDir, file);
      const result = checkFile(filePath, locale);
      results.push(result);
    }
  }
  
  // Group by status
  const needsTranslation = results.filter(r => r.needsTranslation);
  const translated = results.filter(r => !r.needsTranslation && !r.error);
  const errors = results.filter(r => r.error);
  
  console.log('📊 SUMMARY');
  console.log('='.repeat(60));
  console.log(`Total files: ${results.length}`);
  console.log(`✅ Translated: ${translated.length}`);
  console.log(`❌ Needs translation: ${needsTranslation.length}`);
  console.log(`⚠️  Errors: ${errors.length}`);
  
  if (needsTranslation.length > 0) {
    console.log('\n\n❌ FILES NEEDING TRANSLATION:');
    console.log('='.repeat(60));
    
    // Group by locale
    const byLocale = {};
    needsTranslation.forEach(r => {
      if (!byLocale[r.locale]) byLocale[r.locale] = [];
      byLocale[r.locale].push(r);
    });
    
    Object.entries(byLocale).forEach(([locale, files]) => {
      console.log(`\n${locale}:`);
      files.forEach(f => {
        console.log(`  - ${f.file} (${f.percentEnglish}% English content)`);
      });
    });
  }
  
  if (translated.length > 0) {
    console.log('\n\n✅ PROPERLY TRANSLATED FILES:');
    console.log('='.repeat(60));
    
    // Group by locale
    const byLocale = {};
    translated.forEach(r => {
      if (!byLocale[r.locale]) byLocale[r.locale] = [];
      byLocale[r.locale].push(r);
    });
    
    Object.entries(byLocale).forEach(([locale, files]) => {
      console.log(`\n${locale}: ${files.length} files`);
    });
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('\n💡 To translate all files, run:');
  console.log('   node scripts/translate-content.js');
  console.log('\n   (Requires OpenAI API key)');
  console.log('='.repeat(60) + '\n');
}

main();
