import React from "react";
import { View, TouchableOpacity, StyleSheet, Text, Alert } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modalbox";
import Divider from "./common/divider";
const styles = StyleSheet.create({
  okButton: {},
  cancelButton: {}
});
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
    if(this.props.visibility)
    this.show();
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
// const ConfirmationDialog = props => {
//   return (
//     <Modal
//       animationType={"slide"}
//       transparent={false}
//       backdropPressToClose={false}
//       isOpen={props.visibility}
//     >
//       <Text>{props.content}</Text>
//       <Divider />
//       <TouchableOpacity
//         style={styles.cancelButton}
//         onPress={() => props.onCancel()}
//       >
//         <Text style={styles.okButtonText}>{"cancel"}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.okButton}
//         onPress={() => props.onConfirm()}
//       >
//         <Text style={styles.okButtonText}>{"ok"}</Text>
//       </TouchableOpacity>
//     </Modal>
//   );
// };

ConfirmationDialog.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationDialog;
