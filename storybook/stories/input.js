import React from "react";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import Input, {
  FurmlyDatePicker,
  FurmlyCheckbox
} from "../../src/components/input";
import Container from "../../src/components/common/container";

const valueChanged = action("valueChanged");
const time = new Date();
const prev = new Date();
prev.setDate(time.getDate() - 5);

export const dateProps = {
  name: "dateOfBirth",
  description: "This is the day you were born.",
  label: "Date of Birth",
  type: "DATE",
  value: null,
  minDate: prev,
  maxDate: time,
  fromValue: prev,
  toValue: time,
  isRange: true,
  fromValueChanged: action("fromValueChanged"),
  toValueChanged: action("toValueChanged"),
  valueChanged
};

export const checkboxProps = {
  name: "sleeping",
  label: "Are you asleep ?",
  description: "Use this to indicate sleep mode",
  valueChanged
};

const singleDateProps = Object.assign({}, dateProps, { isRange: false });

export const userProps = {
  description: "This is text that is supposed to help you.",
  name: "firstName",
  label: "First Name",
  elementType: "INPUT",
  valueChanged
};
storiesOf("Input", module)
  .addDecorator(fn => <Container style={{ paddingTop: 10 }}>{fn()}</Container>)
  .add("one input with errors", () => (
    <Input
      {...userProps}
      errors={["Something bad has happened", "Your name is compulsory"]}
    />
  ))
  .add("date input", () => <FurmlyDatePicker {...dateProps} />)
  .add("ordinary checkbox", () => <FurmlyCheckbox {...checkboxProps} />);
