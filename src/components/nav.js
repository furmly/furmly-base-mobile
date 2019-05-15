import React from "react";
import styled from "styled-components/native";
import { TouchableOpacity } from "react-native";

const Text = styled.Text`
  margin-top: 5px;
  margin-bottom: 5px;
`;
export default props => {
  return (
    /*jshint ignore:start */
    <TouchableOpacity onPress={() => !props.disabled && props.go()}>
      <Text>{props.text}</Text>
    </TouchableOpacity>
    /*jshint ignore:end */
  );
};
