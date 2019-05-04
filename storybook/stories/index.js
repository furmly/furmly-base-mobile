import React from "react";
import { View } from "react-native";
import { addDecorator } from "@storybook/react-native";

addDecorator(storyFn => <View style={{ flex: 1 }}>{storyFn()}</View>);
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
