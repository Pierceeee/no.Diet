"use client";

import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "next-intlayer";

const LOCALE_DISPLAY_NAMES: Record<string, string> = {
  en: "English",
  lt: "Lietuvių",
  tw: "繁體中文",
  cz: "Čeština",
  lv: "Latviešu",
  il: "עברית",
  ru: "Русский",
  hu: "Magyar",
  gr: "Ελληνικά",
  hr: "Hrvatski",
  dk: "Dansk",
  sk: "Slovenčina",
  ro: "Română",
  jp: "日本語",
};

export function LanguageSwitcher() {
  const { locale, setLocale, availableLocales } = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const handleLocaleChange = (nextLocale: string) => {
    const locales = new Set((availableLocales as string[]).map(String));
    const segments = pathname.split("/").filter(Boolean);

    if (segments.length > 0 && locales.has(segments[0])) {
      segments[0] = nextLocale;
    } else {
      segments.unshift(nextLocale);
    }

    const nextPath = `/${segments.join("/")}`;
    const query = typeof window !== "undefined" ? window.location.search : "";

    setLocale(nextLocale);
    router.push(`${nextPath}${query}`);
  };

  return (
    <label className="inline-flex items-center gap-2 rounded-md border border-gray-200 bg-white px-2 py-1 text-xs text-gray-700">
      <span className="sr-only">Language</span>
      <select
        value={locale}
        onChange={(event) => handleLocaleChange(event.target.value)}
        className="bg-transparent text-xs outline-none"
        aria-label="Language"
      >
        {availableLocales.map((item) => (
          <option key={item} value={item}>
            {LOCALE_DISPLAY_NAMES[item] ?? item}
          </option>
        ))}
      </select>
    </label>
  );
}
