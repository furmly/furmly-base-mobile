import React, { Component } from "react";
import {
  TextInput,
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  Switch,
  StyleSheet,
  View,
  Text
} from "react-native";
import Button from "./button";

export const getErrors = errors =>
  (errors || []).map((e, index) => (
    <Text key={index} style={styles.error}>
      {e}
    </Text>
  ));
export default class extends Component {
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return typeof this.props.value == "number"
      ? "" + this.props.value
      : this.props.value;
  }
  render() {
    /*jshint ignore:start */
    if (this.props.args && this.props.args.disabled)
      return (
        <View>
          <Text style={{ fontWeight: "100" }}>{this.getValue()}</Text>
        </View>
      );
    return (
      <View
        style={{
          marginBottom: 5,
          marginTop: 5
        }}
      >
        <TextInput
          style={styles.textInput}
          underlineColorAndroid="transparent"
          onChangeText={this.props.valueChanged}
          secureTextEntry={
            this.props.args && this.props.args.type == "password"
          }
          value={this.getValue()}
        />
        {getErrors(this.props.errors)}
      </View>
    );
    /*jshint ignore:end */
  }
}

export class FurmlyCheckbox extends Component {
  constructor(props) {
    super(props);
    this.onValueChange = this.onValueChange.bind(this);
  }
  onValueChange(v) {
    this.props.valueChanged(v);
  }
  render() {
    /*jshint ignore:start */
    return (
      <View style={styles.checkboxLayout}>
        <Switch
          value={this.props.value}
          disabled={!!this.props.disabled}
          onValueChange={this.onValueChange}
        />
        <Text>{this.props.description}</Text>
        {getErrors(this.props.errors)}
      </View>
    );
    /*jshint ignore:end */
  }
}

class DatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = { pickerVisible: false };
    this._onPressButton = this._onPressButton.bind(this);
    this.getValue = this.getValue.bind(this);
  }
  getValue() {
    return (
      (this.props.value &&
        Date.prototype.isPrototypeOf(this.props.value) &&
        this.props.value.toLocaleDateString()) ||
      this.props.value
    );
  }
  _onPressButton() {
    if (Platform.OS == "android") {
      if (!this.props.disabled) {
        DatePickerAndroid.open({
          date: (this.props.value && new Date(this.props.value)) || new Date(),
          minDate: this.props.minDate,
          maxDate: this.props.maxDate
        })
          .then(
            (r => {
              if (r.action !== DatePickerAndroid.dismissedAction) {
                let date = `${r.day + "-" + r.month + "-" + r.year}`;
                this.props.valueChanged(date);
              }
            }).bind(this)
          )
          .catch((e, message) => {
            console.log("could not open date picker " + message);
          });
      }
    }
    if (Platform.OS == "ios") {
      //toggle visiblity
      this.setState({ pickerVisible: !this.state.pickerVisible });
    }
  }
  render() {
    /*jshint ignore:start */
    return (
      <View>
        <View style={styles.datePickerLayout}>
          <Button
            leftIcon={"calendar"}
            onPress={this._onPressButton}
            disabled={!!this.props.disabled}
          />
          <Text style={styles.datePickerText}>{this.getValue()}</Text>
          {Platform.OS == "ios" && this.state.pickerVisible ? (
            <View>
              <DatePickerIOS
                minimumDate={this.props.minDate}
                maximumDate={this.props.maxDate}
                date={
                  (this.props.value &&
                    !Date.prototype.isPrototypeOf(this.props.value) &&
                    new Date(this.props.value)) ||
                  this.props.value ||
                  new Date()
                }
                onDateChange={this.props.valueChanged}
              />
            </View>
          ) : null}
        </View>
        {getErrors(this.props.errors)}
      </View>
    );
    /*jshint ignore:end */
  }
}

export const FurmlyDatePicker = props => {
  if (props.isRange) {
    return (
      <View style={styles.horizontalPickers}>
        <DatePicker
          disabled={props.disabled}
          minDate={props.minDate}
          maxDate={props.maxDate}
          value={props.fromValue}
        />
        <DatePicker
          disabled={props.disabled}
          minDate={props.fromValue}
          maxDate={props.maxDate}
          value={props.toValue}
        />
      </View>
    );
  }
  return <DatePicker {...props} />;
};
var styles = StyleSheet.create({
  horizontalPickers: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
    alignItems: "center"
  },
  textInput: {
    backgroundColor: "#60606010",
    color: "black",
    borderWidth: 1,
    padding: 2,
    paddingLeft: 15,
    height: 40,
    borderColor: "#CCB7B7B7"
  },
  error: {
    color: "red"
  },
  datePickerText: {
    fontWeight: "bold"
  },
  datePickerLayout: {
    flexDirection: "row",
    justifyContent: "center",
    alignSelf: "flex-start",
    alignItems: "center",
    padding: 10
  },
  checkboxLayout: {
    flexDirection: "row",
    padding: 2
  }
});
