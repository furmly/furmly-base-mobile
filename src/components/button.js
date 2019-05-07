import React from "react";
import {
  Text,
  View,
  Platform,
  TouchableOpacity,
  TouchableNativeFeedback,
  StyleSheet
} from "react-native";
import Icon from "./common/icon";

const floating = {
    position: "absolute",
    bottom: 15,
    right: 15,
    borderRadius: 100,
    elevation: 4,
    backgroundColor: "#FFFFFF"
  },
  defaultStyle = {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 5,
    minHeight: 40
  },
  getIcon = icon => {
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
      : null,
    rightIcon = props.rightIcon
      ? getIcon({
          name: props.rightIcon,
          size: props.rightIconSize,
          color: props.color
        })
      : null,
    centerItem = props.title ? (
      <Text
        style={{
          color: props.color,
          alignItems: "center",
          alignSelf: "center"
        }}
      >
        {props.title}
      </Text>
    ) : props.centerIcon ? (
      getIcon({
        name: props.centerIcon,
        size: props.centerIconSize,
        color: props.color
      })
    ) : null,
    Highlight = Platform.select({
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

  let st = StyleSheet.flatten([
      defaultStyle,
      (props.floating && floating) || {},
      props.style || {}
    ]),
    element = (
      <View style={st}>
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
