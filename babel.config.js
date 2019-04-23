module.exports = {
  presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module-resolver",
      {
        cwd: "babelrc",
        alias: {
          client_config: "./storybook/furmly-client.config",
          error_handler: "./storybook/error-handler",
          imageMap: "./storybook/image-map"
        },
        include: ["./node_modules/furmly-client", "./src"]
      }
    ]
  ]
};
