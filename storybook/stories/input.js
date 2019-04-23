import React from "react";
import { View, StyleSheet } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { action } from "@storybook/addon-actions";
import Input, {
  FurmlyDatePicker,
  FurmlyCheckbox
} from "../../src/components/input";

const valueChanged = action("valueChanged");
const time = new Date();
const prev = new Date();
prev.setDate(time.getDate() - 5);
const styles = StyleSheet.create({
  fullWidth: {
    flex: 1,
    flexDirection: "row"
  },
  halfWidth: {
    flex: 0.5
  }
}); 
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
  .add("single input text", () => (
    <Input {...userProps} valueChanged={valueChanged} />
  ))
  .add("two inputs on a single line", () => (
    <View style={styles.fullWidth}>
      <View style={styles.halfWidth}>
        <Input {...userProps} />
      </View>
      <View style={styles.halfWidth}>
        <Input {...userProps} name="lastname" label="surname" description="" />
      </View>
    </View>
  ))
  .add("one input with errors", () => (
    <Input
      {...userProps}
      errors={["Something bad has happened", "Your name is compulsory"]}
    />
  ))
  .add("one numerical input", () => (
    <Input
      name="age"
      label="How old are you?"
      elementType="INPUT"
      type="number"
      valueChanged={valueChanged}
    />
  ))
  .add("date input", () => <FurmlyDatePicker {...dateProps} />)
  .add("several date pickers and inputs", () => (
    <View style={styles.fullWidth}>
      <View style={styles.halfWidth}>
        <Input {...userProps} />
      </View>
      <View style={styles.halfWidth}>
        <FurmlyDatePicker {...singleDateProps} />
      </View>
    </View>
  ))
  .add("ordinary checkbox", () => <FurmlyCheckbox {...checkboxProps} />);
