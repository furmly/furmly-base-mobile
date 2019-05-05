import React from "react";
import PropTypes from "prop-types";
import { Label, Container } from "../components/label_wrapper";

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
