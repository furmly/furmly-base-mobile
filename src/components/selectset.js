import React from "react";
import PropTypes from "prop-types";
import { Label } from "./label_wrapper";
import Container from "./common/container";

const SelectSetLayout = props => (
  <React.Fragment>
    <Container>
      <Label>{props.value}</Label>
      {props.inner}
    </Container>
    {props.extraElements}
  </React.Fragment>
);

SelectSetLayout.propTypes = {
  value: PropTypes.string.isRequired,
  inner: PropTypes.object.isRequired
};

export default SelectSetLayout;
