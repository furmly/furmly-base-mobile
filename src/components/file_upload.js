import React, { Component } from "react";
import { Text, View, Image, StyleSheet } from "react-native";
import Button from "./button";
import { getErrors } from "./input";
const ImagePicker = require("react-native-image-picker");

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: "Select an Image"
};
const imageTypes = /(png|jpeg|jpg)/i;
const styles = StyleSheet.create({
  titleStyle: {
    fontWeight: "bold",
    fontSize: 14
  },
  descriptionStyle: {
    fontSize: 8
  },
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: -50
  },
  uploadButtonStyle: {
    alignSelf: "flex-start"
  },
  unSupportedText: {
    color: "red"
  }
});
export default class FileUpload extends Component {
  constructor(props) {
    super(props);
    this.openCameraRoll = this.openCameraRoll.bind(this);
  }
  static supports(fileType) {
    return !!FileUpload.getPreview(fileType);
  }
  static getPreview(fileType) {
    for (var i = 0; i < Previews.length; i++) {
      if (Previews[i].id.test(fileType)) return Previews[i];
    }
  }
  static getPreviewQuery(fileType) {
    let preview = FileUpload.getPreview(fileType);
    return preview ? preview.query : "";
  }
  openCameraRoll() {
    ImagePicker.showImagePicker(options, response => {
      console.log("Response = ", response);

      if (response.didCancel || response.error) {
        console.log("User cancelled/error image picker");
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        let file = {
          uri: response.uri,
          type: response.type,
          name: response.fileName
        };
        console.log(file);
        this.props.upload(file);
      }
    });
  }
  render() {
    let Preview = this.props.previewType,
      preview;
    if (this.props.preview) {
      preview = <Preview data={this.props.preview} />;
    }
    return (
      <View>
        <Text style={styles.titleStyle}>{this.props.title}</Text>
        <Text style={styles.desciptionStyle}>{this.props.description}</Text>
        <View>{preview}</View>
        <View style={styles.uploadButtonStyle}>
          <Button
            centerIcon="cloud-upload"
            style={{
              zIndex: 1000,
              borderRadius: 100,
              backgroundColor: "#FFFFFF"
            }}
            onPress={() => this.openCameraRoll()}
          />
        </View>
        {getErrors(this.props.errors)}
      </View>
    );
  }
}

const ImagePreview = props => {
  return <Image source={{ uri: props.data.uri }} style={styles.imagePreview} />;
};
ImagePreview.id = imageTypes;
ImagePreview.query = "?format=base64";

export const Previews = [ImagePreview];
export const UnsupportedText = props => {
  return <Text style={styles.unSupportedText}>{props.message}</Text>;
};
