import React from "react";
import Text from "../src/components/common/error";
import Container from "../src/components/common/container";
module.exports = e => (
  <Container>
    <Text>{e.message}</Text>
  </Container>
);
