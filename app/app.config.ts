import dotenv from "dotenv";
dotenv.config();

export default {
  expo: {
    name: "app",
    slug: "app",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      supportsTablet: true,
    },
    android: {
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      yapilyBaseUrl: process.env.YAPILY_BASE_URL,
      yapilyAppKey: process.env.YAPILY_APP_KEY,
      yapilyAppSecret: process.env.YAPILY_APP_SECRET,
    },
    scheme: "expo.examples.with-webbrowser-redirect",
  },
};
