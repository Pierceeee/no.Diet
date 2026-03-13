/**
 * Translation script for Intlayer content files
 * 
 * This script translates all content files in the locales directory from English to their respective languages.
 * 
 * Usage:
 * 1. Set your OpenAI API key: set OPENAI_API_KEY=your-key-here
 * 2. Run: node scripts/translate-content.js
 */

const fs = require('fs');
const path = require('path');

// Locale mapping: folder name -> language name for better translations
const LOCALE_NAMES = {
  'en': 'English',
  'lt': 'Lithuanian',
  'cs': 'Czech',
  'lv': 'Latvian',
  'he': 'Hebrew',
  'ru': 'Russian',
  'hu': 'Hungarian',
  'el': 'Greek',
  'hr': 'Croatian',
  'da': 'Danish',
  'sk': 'Slovak',
  'ro': 'Romanian',
  'ja': 'Japanese',
  'zh-Hant': 'Traditional Chinese',
  'zh-TW': 'Traditional Chinese (Taiwan)',
  // Locale aliases that should use the same translations
  'cz': 'Czech',
  'dk': 'Danish',
  'gr': 'Greek',
  'il': 'Hebrew',
  'jp': 'Japanese',
  'tw': 'Traditional Chinese (Taiwan)',
};

const LOCALES_DIR = path.join(__dirname, '..', 'locales');
const ENGLISH_DIR = path.join(LOCALES_DIR, 'en');

async function translateWithOpenAI(text, targetLanguage, apiKey) {
  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini', // Fast and cost-effective
      messages: [
        {
          role: 'system',
          content: `You are a professional translator. Translate the following text to ${targetLanguage}. Maintain the tone, style, and formatting. Only return the translated text, nothing else.`
        },
        {
          role: 'user',
          content: text
        }
      ],
      temperature: 0.3, // Lower temperature for more consistent translations
    }),
  });

  if (!response.ok) {
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.choices[0].message.content.trim();
}

function deepTranslate(obj, translateFn, isRoot = true) {
  if (typeof obj === 'string') {
    return translateFn(obj);
  }
  
  if (Array.isArray(obj)) {
    return Promise.all(obj.map(item => deepTranslate(item, translateFn, false)));
  }
  
  if (obj && typeof obj === 'object') {
    const result = {};
    const keys = Object.keys(obj);
    
    return Promise.all(
      keys.map(async (key) => {
        // Don't translate these metadata fields
        if (isRoot && ['$schema', 'key', 'locale'].includes(key)) {
          result[key] = obj[key];
          return;
        }
        
        result[key] = await deepTranslate(obj[key], translateFn, false);
      })
    ).then(() => result);
  }
  
  return obj;
}

async function translateFile(filePath, targetLocale, targetLanguage, apiKey) {
  console.log(`\n📝 Translating ${path.basename(filePath)} to ${targetLanguage}...`);
  
  // Read the English source file
  const englishContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  // Create translation function with rate limiting
  let translationCount = 0;
  let retryCount = 0;
  const translateText = async (text) => {
    if (!text || text.trim() === '') return text;
    
    translationCount++;
    
    // Rate limiting: 3 translations per second with delays
    await new Promise(resolve => setTimeout(resolve, 400));
    
    try {
      const translated = await translateWithOpenAI(text, targetLanguage, apiKey);
      process.stdout.write('.');
      retryCount = 0; // Reset retry count on success
      return translated;
    } catch (error) {
      // Handle rate limit errors with exponential backoff
      if (error.message.includes('429')) {
        retryCount++;
        const delay = Math.min(2000 * Math.pow(2, retryCount), 30000); // Max 30 seconds
        console.log(`\n⏳ Rate limit hit. Waiting ${delay/1000}s before retry...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        // Retry the translation
        try {
          const translated = await translateWithOpenAI(text, targetLanguage, apiKey);
          process.stdout.write('.');
          return translated;
        } catch (retryError) {
          console.error(`\n❌ Retry failed: "${text.substring(0, 50)}..."`);
          return text; // Fallback to original text
        }
      }
      
      console.error(`\n❌ Error translating: "${text.substring(0, 50)}..."`);
      console.error(error.message);
      return text; // Fallback to original text
    }
  };
  
  // Translate the content
  const translatedContent = await deepTranslate(englishContent, translateText);
  
  // Update locale field
  translatedContent.locale = targetLocale;
  
  // Write the translated file
  const targetDir = path.join(LOCALES_DIR, targetLocale);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const targetPath = path.join(targetDir, path.basename(filePath));
  fs.writeFileSync(targetPath, JSON.stringify(translatedContent, null, 2), 'utf-8');
  
  console.log(`\n✅ Completed: ${translationCount} strings translated`);
}

async function main() {
  const apiKey = process.env.OPENAI_API_KEY;
  
  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY environment variable not set');
    console.error('\nPlease set your OpenAI API key:');
    console.error('  Windows PowerShell: $env:OPENAI_API_KEY="your-key-here"');
    console.error('  Windows CMD: set OPENAI_API_KEY=your-key-here');
    console.error('  Linux/Mac: export OPENAI_API_KEY=your-key-here');
    console.error('\nOr run with key inline:');
    console.error('  OPENAI_API_KEY=your-key-here node scripts/translate-content.js');
    process.exit(1);
  }
  
  console.log('🌍 Starting translation process...\n');
  
  // Get all English content files
  const englishFiles = fs.readdirSync(ENGLISH_DIR)
    .filter(file => file.endsWith('.content.json'));
  
  console.log(`Found ${englishFiles.length} content files to translate:`);
  englishFiles.forEach(file => console.log(`  - ${file}`));
  
  // Get target locales (exclude 'en' and get unique locales)
  const allLocales = fs.readdirSync(LOCALES_DIR)
    .filter(item => {
      const itemPath = path.join(LOCALES_DIR, item);
      return fs.statSync(itemPath).isDirectory() && item !== 'en';
    });
  
  const uniqueLocales = [...new Set(allLocales)];
  
  console.log(`\nTranslating to ${uniqueLocales.length} locales:`);
  uniqueLocales.forEach(locale => {
    const language = LOCALE_NAMES[locale] || locale;
    console.log(`  - ${locale} (${language})`);
  });
  
  console.log('\n' + '='.repeat(60));
  
  // Translate each file for each locale
  for (const file of englishFiles) {
    const filePath = path.join(ENGLISH_DIR, file);
    
    console.log(`\n${'='.repeat(60)}`);
    console.log(`📄 Processing: ${file}`);
    console.log('='.repeat(60));
    
    for (const locale of uniqueLocales) {
      const targetLanguage = LOCALE_NAMES[locale] || locale;
      
      try {
        await translateFile(filePath, locale, targetLanguage, apiKey);
      } catch (error) {
        console.error(`\n❌ Failed to translate ${file} to ${locale}:`);
        console.error(error.message);
      }
    }
  }
  
  console.log('\n' + '='.repeat(60));
  console.log('✨ Translation complete!');
  console.log('='.repeat(60));
}

// Run the script
main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
