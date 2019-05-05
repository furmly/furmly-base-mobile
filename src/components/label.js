import React from "react";
import styled from "styled-components/native";
import { smallText } from "../variables";
import { Container } from "./label_wrapper";

const Text = styled.Text`
  font-size: ${smallText};
`;
export default props => (
  <Container>
    <Text>{props.description}</Text>
  </Container>
);
