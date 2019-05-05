import React from "react";
import styled from "styled-components/native";
import { minimumInputHeight, progressBarColor } from "../../variables";

const View = styled.View`
  height: ${minimumInputHeight}px;
  background-color: ${progressBarColor};
`;
const GrayProgressIndicator = () => {
  return <View />;
};

export default GrayProgressIndicator;
