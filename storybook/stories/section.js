import React from "react";
import { storiesOf } from "@storybook/react-native";
import configure from "../../src/configure";
import { apiMiddleware } from "../utils";

const controls = configure({
  providerConfig: [
    {
      apiMiddleware
    }
  ]
});
const Provider = controls.PROVIDER;

storiesOf("Section", module).add("default", () => <Provider id={"section"} />);