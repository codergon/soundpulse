module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            app: "./app",
            lib: "./src/lib",
            assets: "./assets",
            utils: "./src/utils",
            hooks: "./src/hooks",
            config: "./src/config",
            typings: "./src/types",
            layouts: "./src/layouts",
            screens: "./src/screens",
            helpers: "./src/helpers",
            providers: "./src/providers",
            constants: "./src/constants",
            navigation: "./src/navigation",
            components: "./src/components",
          },
          extensions: [".ios.js", ".android.js", ".js", ".ts", ".tsx", ".json"],
        },
      ],
    ],
  };
};
