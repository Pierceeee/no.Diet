# Translation Scripts

This folder contains scripts to help with content translation.

## translate-content.js

Automatically translates all content files from English to all target locales using OpenAI.

### Prerequisites

You need an OpenAI API key. Get one at: https://platform.openai.com/api-keys

### Usage

1. **Set your API key** (choose one method):

   **PowerShell:**
   ```powershell
   $env:OPENAI_API_KEY="sk-your-key-here"
   node scripts/translate-content.js
   ```

   **Command Prompt:**
   ```cmd
   set OPENAI_API_KEY=sk-your-key-here
   node scripts/translate-content.js
   ```

   **Inline (any shell):**
   ```bash
   OPENAI_API_KEY=sk-your-key-here node scripts/translate-content.js
   ```

2. **Run the script**:
   ```bash
   node scripts/translate-content.js
   ```

### What it does

- Reads all `.content.json` files from `locales/en/`
- Translates content to all target languages (Lithuanian, Czech, Japanese, etc.)
- Preserves JSON structure and metadata (`$schema`, `key`, `locale`)
- Rate-limits API calls to avoid hitting limits
- Shows progress with dots (one dot per translated string)
- Handles errors gracefully (falls back to English if translation fails)

### Cost Estimate

Using GPT-4o-mini (recommended):
- ~$0.15 per 1M input tokens
- ~$0.60 per 1M output tokens
- Estimated cost for this project: **$2-5** total for all translations

### Languages Supported

The script translates to these languages:
- Lithuanian (lt)
- Czech (cs, cz)
- Latvian (lv)
- Hebrew (he, il)
- Russian (ru)
- Hungarian (hu)
- Greek (el, gr)
- Croatian (hr)
- Danish (da, dk)
- Slovak (sk)
- Romanian (ro)
- Japanese (ja, jp)
- Traditional Chinese (zh-Hant, zh-TW, tw)

## Alternative: Use Intlayer CLI

If you have an Intlayer CMS account, you can use their built-in translation:

```bash
npx intlayer fill --source-locale en --mode complete
```

This requires setting up an Intlayer account and adding your CMS access key to the config.
