import React from "react";
import { Text, TouchableOpacity } from "react-native";

export default props => {
  return (
    /*jshint ignore:start */
    <TouchableOpacity onPress={() => !props.disabled && props.go()}>
      <Text
        style={{
          marginTop: 5,
          marginBottom: 5
        }}
      >
        {props.text}
      </Text>
    </TouchableOpacity>
    /*jshint ignore:end */
  );
};
