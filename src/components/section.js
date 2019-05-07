import React from "react";
import {
  UIManager,
  LayoutAnimation,
  View,
  TouchableOpacity
} from "react-native";
import styled from "styled-components/native";
import { titleText, containerPadding, labelColor } from "../variables";
import StyledIcon from "./common/icon";
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
const StyledText = styled.Text`
  font-size: ${titleText};
  font-weight: bold;
  padding: 0px ${containerPadding}px;
  color: ${labelColor};
`;
const ToggleButton = styled.View`
  position: absolute;
  top: ${containerPadding}px;
  right: ${containerPadding}px;
  z-index:-1;
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

export const SectionHeader = props => <StyledText>{props.children}</StyledText>;
