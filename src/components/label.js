import React from "react";
import styled from "styled-components/native";
import { smallText, labelColor } from "../variables";
import Container from "./common/container";

const Text = styled.Text`
  font-size: ${smallText};
  color: ${labelColor};
`;
export default props => (
  <Container>
    <Text>{props.description}</Text>
  </Container>
);
