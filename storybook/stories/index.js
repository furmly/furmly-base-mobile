import React from "react";
import { View } from "react-native";
import { addDecorator } from "@storybook/react-native";
import { ThemeProvider } from "styled-components";

const theme = {
  factor: 1,
  iconColor: "black",
  labelColor: "#28386f",
  inputBackgroundColor: "#d5cf51",
  inputColor: "white"
};
addDecorator(storyFn => (
  <ThemeProvider theme={theme}>{storyFn()}</ThemeProvider>
));
addDecorator(storyFn => (
  <View style={{ flex: 1, backgroundColor: "#f5f6d7" }}>{storyFn()}</View>
));
require("./sink");
require("./input");
require("./connected-input");
require("./section");
require("./selectset");
require("./image");
require("./label");
require("./list");
require("./fileupload");
require("./actionview");
require("./grid");
require("./webview");
require("./select");
