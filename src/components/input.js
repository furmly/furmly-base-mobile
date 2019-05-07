import React, { Component } from "react";
import {
  Platform,
  DatePickerAndroid,
  DatePickerIOS,
  StyleSheet,
  TouchableOpacity,
  View,
  Text
} from "react-native";
import styled from "styled-components/native";
import Icon from "./common/icon";
import Button from "./button";
import {
  inputPadding,
  inputColor,
  inputBackgroundColor,
  minimumInputHeight,
  elementPadding,
  labelColor,
  accentColor
} from "../variables";

const InputContainer = styled.View`
  color: ${inputColor};
  /*margin-bottom: 5px;
  margin-top: 5px;*/
`;
const DisabledInput = styled.Text`
  font-weight: bold;
  background-color: ${inputBackgroundColor};
  color: ${inputColor};
  padding: ${inputPadding};
`;
const StyledInput = styled.TextInput`
  background-color: ${inputBackgroundColor};
  color: ${inputColor};
  border-width: 0;
  padding: ${inputPadding};
  height: ${minimumInputHeight};
`;

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
        <InputContainer>
          <DisabledInput>{this.getValue()}</DisabledInput>
        </InputContainer>
      );
    return (
      <InputContainer>
        <StyledInput
          underlineColorAndroid="transparent"
          onChangeText={this.props.valueChanged}
          secureTextEntry={
            this.props.args && this.props.args.type == "password"
          }
          value={this.getValue()}
        />
        {getErrors(this.props.errors)}
      </InputContainer>
    );
    /*jshint ignore:end */
  }
}

const CheckboxLayout = styled.View`
  flex-direction: row;
  align-items: center;
`;
const Switch = styled.Switch.attrs(props => ({
  trackColor: { false: inputBackgroundColor(props), true: accentColor(props) },
  thumbColor: null
}))``;

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
      <CheckboxLayout>
        <Switch
          value={this.props.value}
          disabled={!!this.props.disabled}
          onValueChange={this.onValueChange}
        />
        <Text style={{ alignSelf: "center" }}>{this.props.description}</Text>
        {getErrors(this.props.errors)}
      </CheckboxLayout>
    );
    /*jshint ignore:end */
  }
}

const DatePickerLayout = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  align-items: center;
`;
const DatePickerButton = styled.View`
  height: ${minimumInputHeight}px;
  background-color: ${inputBackgroundColor};
  flex-direction: row;
  align-items: center;
  padding: ${elementPadding}px;
  /* justify-content: space-around; */
`;
const DateText = styled.Text`
  color: ${inputColor};
  flex: 1;
`;
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
      <React.Fragment>
        <DatePickerLayout>
          <TouchableOpacity onPress={this._onPressButton} style={{ flex: 1 }}>
            <DatePickerButton>
              <DateText>{this.getValue()}</DateText>
              <Icon name={"calendar"} size={24} />
            </DatePickerButton>
          </TouchableOpacity>
          {Platform.OS == "ios" && this.state.pickerVisible ? (
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
          ) : null}
        </DatePickerLayout>
        {getErrors(this.props.errors)}
      </React.Fragment>
    );
    /*jshint ignore:end */
  }
}

const HorizontalLayout = styled.View`
  flex-direction: row;
  justify-content: center;
  align-self: flex-start;
  align-items: stretch;
  flex: 1;
`;
export const FurmlyDatePicker = props => {
  if (props.isRange) {
    return (
      <HorizontalLayout>
        <View style={{ flex: 1 }}>
          <DatePicker
            disabled={props.disabled}
            minDate={props.minDate}
            maxDate={props.maxDate}
            value={props.fromValue}
          />
        </View>
        <View style={{ flex: 1 }}>
          <DatePicker
            disabled={props.disabled}
            minDate={props.fromValue}
            maxDate={props.maxDate}
            value={props.toValue}
          />
        </View>
      </HorizontalLayout>
    );
  }
  return <DatePicker {...props} />;
};
var styles = StyleSheet.create({
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
  }
});
