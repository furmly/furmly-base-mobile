import React from "react";
import { storiesOf } from "@storybook/react-native";
import ActivityIndicator from "../../src/components/activity_indicator";

storiesOf("Activity Indicator", module).add("default", () => (
  <ActivityIndicator title={"Pretending to work..."} />
));
