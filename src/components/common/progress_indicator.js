import React from "react";
import styled from "styled-components/native";
import {
  minimumInputHeight,
  progressBarColor,
  containerPadding
} from "../../variables";

const View = styled.View`
  height: ${minimumInputHeight}px;
  background-color: ${progressBarColor};
  margin: 0 ${containerPadding}px;
`;
const GrayProgressIndicator = () => {
  return <View />;
};

export default GrayProgressIndicator;
