import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components/native";
import {
  labelBackgroundColor,
  labelColor,
  containerPadding,
  labelPadding,
  smallText,
  elementPadding
} from "../variables";

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  padding: 0 ${containerPadding}px;
  margin-bottom: ${elementPadding}px;
`;
export const Label = styled.Text`
  font-weight: bold;
  font-size: ${smallText}px;
  background-color: ${labelBackgroundColor};
  color: ${labelColor};
  padding: ${labelPadding}px;
  padding-left: 0;
`;
const LabelWrapper = props => (
  <Container>
    <Label>{props.value}</Label>
    {props.inner}
    {props.extraElements}
  </Container>
);

LabelWrapper.propTypes = {
  value: PropTypes.string.isRequired,
  inner: PropTypes.object.isRequired
};

export default LabelWrapper;
