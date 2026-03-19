/**
 * Translate files one locale at a time to avoid rate limits
 * 
 * Usage: node scripts/translate-one-locale.js <locale>
 * Example: node scripts/translate-one-locale.js ja
 */

const fs = require('fs');
const path = require('path');

const LOCALE_NAMES = {
  'en': 'English',
  'lt': 'Lithuanian',
  'tw': 'Traditional Chinese (Taiwan)',
  'cz': 'Czech',
  'lv': 'Latvian',
  'il': 'Hebrew',
  'ru': 'Russian',
  'hu': 'Hungarian',
  'gr': 'Greek',
  'hr': 'Croatian',
  'dk': 'Danish',
  'sk': 'Slovak',
  'ro': 'Romanian',
  'jp': 'Japanese',
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
      model: 'gpt-4o-mini',
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
      temperature: 0.3,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`OpenAI API error: ${response.status} ${response.statusText} - ${errorText}`);
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
  
  const englishContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  
  let translationCount = 0;
  let errorCount = 0;
  let retryCount = 0;
  
  const translateText = async (text) => {
    if (!text || text.trim() === '') return text;
    
    translationCount++;
    
    // Slower rate: 2 per second
    await new Promise(resolve => setTimeout(resolve, 600));
    
    try {
      const translated = await translateWithOpenAI(text, targetLanguage, apiKey);
      process.stdout.write('.');
      retryCount = 0;
      return translated;
    } catch (error) {
      if (error.message.includes('429')) {
        retryCount++;
        const delay = Math.min(3000 * Math.pow(2, retryCount), 60000);
        console.log(`\n⏳ Rate limit. Waiting ${delay/1000}s...`);
        await new Promise(resolve => setTimeout(resolve, delay));
        
        try {
          const translated = await translateWithOpenAI(text, targetLanguage, apiKey);
          process.stdout.write('.');
          return translated;
        } catch (retryError) {
          errorCount++;
          console.error(`\n❌ Failed: "${text.substring(0, 40)}..."`);
          return text;
        }
      }
      
      errorCount++;
      console.error(`\n❌ Error: "${text.substring(0, 40)}..."`);
      return text;
    }
  };
  
  const translatedContent = await deepTranslate(englishContent, translateText);
  translatedContent.locale = targetLocale;
  
  const targetDir = path.join(LOCALES_DIR, targetLocale);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  
  const targetPath = path.join(targetDir, path.basename(filePath));
  fs.writeFileSync(targetPath, JSON.stringify(translatedContent, null, 2), 'utf-8');
  
  console.log(`\n✅ Done: ${translationCount} translated, ${errorCount} errors`);
  
  return { translationCount, errorCount };
}

async function main() {
  const targetLocale = process.argv[2];
  
  if (!targetLocale) {
    console.error('❌ Error: Please specify a locale');
    console.error('\nUsage: node scripts/translate-one-locale.js <locale>');
    console.error('\nExamples:');
    console.error('  node scripts/translate-one-locale.js ja    # Japanese');
    console.error('  node scripts/translate-one-locale.js cs    # Czech');
    console.error('  node scripts/translate-one-locale.js ru    # Russian');
    console.error('\nAvailable locales:');
    Object.entries(LOCALE_NAMES).forEach(([code, name]) => {
      if (code !== 'en') console.error(`  ${code} - ${name}`);
    });
    process.exit(1);
  }
  
  const targetLanguage = LOCALE_NAMES[targetLocale];
  if (!targetLanguage) {
    console.error(`❌ Unknown locale: ${targetLocale}`);
    process.exit(1);
  }
  
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    console.error('❌ Error: OPENAI_API_KEY not set');
    process.exit(1);
  }
  
  console.log(`🌍 Translating to ${targetLanguage} (${targetLocale})\n`);
  
  const englishFiles = fs.readdirSync(ENGLISH_DIR)
    .filter(file => file.endsWith('.content.json'));
  
  console.log(`Found ${englishFiles.length} files to translate\n`);
  console.log('='.repeat(60));
  
  let totalTranslations = 0;
  let totalErrors = 0;
  
  for (const file of englishFiles) {
    const filePath = path.join(ENGLISH_DIR, file);
    const { translationCount, errorCount } = await translateFile(
      filePath,
      targetLocale,
      targetLanguage,
      apiKey
    );
    totalTranslations += translationCount;
    totalErrors += errorCount;
  }
  
  console.log('\n' + '='.repeat(60));
  console.log(`✨ Complete!`);
  console.log(`   Total: ${totalTranslations} translations, ${totalErrors} errors`);
  console.log('='.repeat(60));
}

main().catch(error => {
  console.error('❌ Fatal error:', error);
  process.exit(1);
});
