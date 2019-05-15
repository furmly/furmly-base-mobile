import React from "react";
import {
  UIManager,
  LayoutAnimation,
  View,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { containerPadding } from "../variables";
import StyledIcon from "./common/icon";
import Title from "./common/title";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
  
const StyledSectionBody = styled.View`
  flex-grow: 1;
  elevation: 2;
  margin-vertical: ${containerPadding}px;
  background-color: #ffffff;
  position: relative;
  padding-top: ${containerPadding}px;
  padding-bottom: ${containerPadding}px;
`;

const ToggleButton = styled.View`
  position: absolute;
  top: ${containerPadding}px;
  right: ${containerPadding}px;
  z-index: -1;
`;
export class SectionBody extends React.Component {
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
  }
  state = { h: 0 };
  toggle() {
    LayoutAnimation.easeInEaseOut();
    this.setState({ h: this.state.h ? 0 : "auto" });
  }
  render() {
    return (
      <StyledSectionBody>
        <TouchableOpacity onPress={this.toggle}>
          {this.props.header}
        </TouchableOpacity>
        <View style={{ height: this.state.h, overflow: "hidden" }}>
          {this.props.content}
        </View>
        <ToggleButton>
          <StyledIcon
            name={!this.state.h ? "chevron-down" : "chevron-up"}
            size={32}
          />
        </ToggleButton>
      </StyledSectionBody>
    );
  }
}

export const SectionHeader = props => <Title>{props.children}</Title>;
