import React from "react";
import styled from "styled-components/native";
import { titleText, labelColor } from "../variables";

const View = styled.View`
  align-items: "center";
  align-self: "stretch";
  flex: 1;
  padding: 10;
  justify-content: center;
`;
const Text = styled.Text`
  font-weight: bold;
  font-size: ${titleText}px;
  color: ${labelColor};
`;
export default props => {
  return (
    <View>
      <Text>{props.text}</Text>
    </View>
  );
};
