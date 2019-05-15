import React from "react";
import {
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import styled from "styled-components/native";
import Icon from "./common/icon";
import {
  elementPadding,
  minimumInputHeight,
  accentColor,
  primaryButtonForegroundColor,
  defaultBackgroundColor,
} from "../variables";

export const INTENT = {
  DEFAULT: "DEFAULT",
  ACCENT: "ACCENT"
};

const getBackgroundColorFromIntent = props => {
  switch (props.intent) {
    case INTENT.DEFAULT:
      return defaultBackgroundColor(props);
    case INTENT.ACCENT:
      return accentColor(props);
  }
  return defaultBackgroundColor(props);
};
const getForeColorFromIntent = props => {
  switch (props.intent) {
    case INTENT.DEFAULT:
      return primaryButtonForegroundColor(props);
    case INTENT.ACCENT:
      return accentButtonForegroundColor(props);
  }
  return primaryButtonForegroundColor(props);
};
const Text = styled.Text`
  color: ${getForeColorFromIntent};
  font-weight:bold;
  align-items: center;
  align-self: center;
`;
const shadow = Platform.select({
  ios: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 12
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.0
  },
  android: {
    elevation: 8
  }
});
const View = styled.View.attrs({
  ...shadow
})`
  flex-direction: row;
  justify-content: space-around;
  padding: ${elementPadding}px;
  min-height: ${minimumInputHeight}px;
  background-color: ${getBackgroundColorFromIntent};
`;
const floating = {
  position: "absolute",
  bottom: 15,
  right: 15,
  borderRadius: 100,
  elevation: 4
};
const defaultStyle = {};
const getIcon = icon => {
  const props = {
    name: icon.name,
    size: icon.size == "large" ? 60 : icon.size || 18
  };
  if (icon.color) props.color = icon.color;
  return React.createElement(Icon, props);
};
export default props => {
  let leftIcon = props.leftIcon
    ? getIcon({
        name: props.leftIcon,
        size: props.leftIconSize,
        color: props.color
      })
    : null;
  const rightIcon = props.rightIcon
    ? getIcon({
        name: props.rightIcon,
        size: props.rightIconSize,
        color: props.color
      })
    : null;
  const centerItem = props.title ? (
    <Text>{props.title}</Text>
  ) : props.centerIcon ? (
    getIcon({
      name: props.centerIcon,
      size: props.centerIconSize,
      color: props.color
    })
  ) : null;
  const Highlight = Platform.select({
    ios: () => {
      return {
        type: TouchableOpacity,
        props: {
          underlayColor: "white",
          activeOpacity: 0.7
        }
      };
    },
    android: () => {
      return { type: TouchableNativeFeedback };
    }
  })();

  const st = StyleSheet.flatten([
    defaultStyle,
    (props.floating && floating) || {},
    props.style || {}
  ]);
  const element = (
    <View intent={props.intent} style={st}>
      {leftIcon}
      {centerItem}
      {rightIcon}
    </View>
  );

  if (props.disabled) return element;

  return (
    <Highlight.type {...Highlight.props} onPress={() => props.onPress()}>
      {element}
    </Highlight.type>
  );
};
