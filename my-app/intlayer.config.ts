import type { IntlayerConfig } from "intlayer";

const config = {
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
    ],
    defaultLocale: "en",
    strictMode: "inclusive",
  },
  content: {
    contentDir: ["locales", "app", "components"],
  },
};

export default config as IntlayerConfig;
