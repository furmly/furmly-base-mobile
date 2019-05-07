import React from "react";
import { Alert } from "react-native";
import PropTypes from "prop-types";

class ConfirmationDialog extends React.PureComponent {
  componentWillReceiveProps(nextProps) {
    if (
      nextProps.visibility &&
      nextProps.visibility !== this.props.visibility
    ) {
      this.show(nextProps);
    }
  }
  componentDidMount() {
    if (this.props.visibility) this.show();
  }
  show = (nextProps = this.props) => {
    Alert.alert(
      "Confirm",
      nextProps.content,
      [
        {
          text: "Cancel",
          onPress: nextProps.onCancel,
          style: "cancel"
        },
        { text: "OK", onPress: nextProps.onConfirm }
      ],
      { cancelable: false }
    );
  };
  render() {
    return null;
  }
}

ConfirmationDialog.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationDialog;
