import React from "react";
import styled from "styled-components/native";
import { View } from "react-native";
import { errorColor } from "../variables";

const Text = styled.Text`
  color: ${errorColor};
`;
export default props => {
  return (
    <View>
      <Text>{props.value}</Text>
    </View>
  );
};
