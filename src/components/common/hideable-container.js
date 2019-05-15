import React from "react";
import { UIManager, LayoutAnimation, View } from "react-native";

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);

export default ToggleButton => {
  class HideableContainer extends React.PureComponent {
    state = {
      h: 0
    };
    toggle = () => {
      LayoutAnimation.easeInEaseOut();
      this.setState({ h: this.state.h ? 0 : "auto" });
    };
    render() {
      const { toggleButtonProps = {}, children } = this.props;
      return (
        <React.Fragment>
          <ToggleButton
            {...toggleButtonProps}
            toggle={this.toggle}
            isOpen={!!this.state.h}
          />
          <View style={{ height: this.state.h, overflow: "hidden" }}>
            {children}
          </View>
        </React.Fragment>
      );
    }
  }
  return HideableContainer;
};
