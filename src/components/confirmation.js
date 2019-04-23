import React from "react";
import { View, TouchableHighlight, StyleSheet } from "react-native";
import PropTypes from "prop-types";
import Modal from "react-native-modalbox";
const styles = StyleSheet.create({
  okButton: {},
  cancelButton: {}
});
const ConfirmationDialog = props => {
  return (
    <Modal
      animationType={"slide"}
      transparent={false}
      backdropPressToClose={false}
      visibility={props.visibility}
    >
      <View>{props.content}</View>
      <TouchableHighlight
        style={styles.cancelButton}
        onPress={() => props.onCancel()}
      >
        <Text style={styles.okButtonText}>{"cancel"}</Text>
      </TouchableHighlight>
      <TouchableHighlight
        style={styles.okButton}
        onPress={() => props.onConfirm()}
      >
        <Text style={styles.okButtonText}>{"ok"}</Text>
      </TouchableHighlight>
    </Modal>
  );
};

ConfirmationDialog.propTypes = {
  visibility: PropTypes.bool,
  content: PropTypes.any.isRequired,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired
};

export default ConfirmationDialog;
