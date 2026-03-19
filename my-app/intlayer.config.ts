import type { IntlayerConfig } from "intlayer";

const config: IntlayerConfig = {
  internationalization: {
    locales: [
      "en",
      "lt",
      "tw",
      "cz",
      "lv",
      "il",
      "ru",
      "hu",
      "gr",
      "hr",
      "dk",
      "sk",
      "ro",
      "jp",
    ] as IntlayerConfig["internationalization"]["locales"],
    defaultLocale: "en" as IntlayerConfig["internationalization"]["defaultLocale"],
    strictMode: "inclusive",
  },
  content: {
    contentDir: ["locales", "app", "components"],
  },
};

export default config;
