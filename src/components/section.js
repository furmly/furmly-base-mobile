import React from "react";
import styled from "styled-components/native";
import { titleText, containerPadding, labelColor } from "../variables";

const StyledSectionBody = styled.View`
  flex-grow: 1;
  elevation: 2;
  margin-vertical: ${containerPadding}px;
  background-color: #ffffff;
`;
const StyledText = styled.Text`
  font-size: ${titleText};
  font-weight: bold;
  padding: 0px ${containerPadding}px;
  color: ${labelColor};
`;
export const SectionBody = props => (
  <StyledSectionBody>
    {props.header}
    {props.content}
  </StyledSectionBody>
);
export const SectionHeader = props => <StyledText>{props.children}</StyledText>;
