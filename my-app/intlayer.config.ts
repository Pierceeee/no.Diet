import { Locales, type IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      Locales.ENGLISH,
      Locales.LITHUANIAN,
      Locales.CHINESE_TRADITIONAL,
      Locales.CZECH,
      Locales.LATVIAN,
      Locales.HEBREW,
      Locales.RUSSIAN,
      Locales.HUNGARIAN,
      Locales.GREEK,
      Locales.CROATIAN,
      Locales.DANISH,
      Locales.SLOVAK,
      Locales.ROMANIAN,
      Locales.JAPANESE,
    ],
    defaultLocale: Locales.ENGLISH,
    strictMode: "inclusive",
  },
  content: {
    contentDir: ["locales", "app", "components"],
  },
};

export default config;
