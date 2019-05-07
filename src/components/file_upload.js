import React, { Component } from "react";
import styled from "styled-components/native";
import { View, Image, StyleSheet } from "react-native";
import Button from "./button";
import { getErrors } from "./input";
import { smallText, containerPadding } from "../variables";
import { Label } from "./label_wrapper";
import ErrorText from "./common/error";
import Copy from "./common/copy";
const ImagePicker = require("react-native-image-picker");

// More info on all the options is below in the README...just some common use cases shown here
const options = {
  title: "Select an Image"
};
const imageTypes = /(png|jpeg|jpg)/i;
const styles = StyleSheet.create({
  imagePreview: {
    width: 150,
    height: 150,
    borderRadius: 100,
    marginBottom: -50
  }
});
const Container = styled.View`
  padding: 0 ${containerPadding}px;
`;
const UploadButtonContainer = styled.View`
  align-self: flex-start;
`;

const StyledUnsupportedText = styled(ErrorText)`
  font-size: ${smallText}px;
`;

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
      console.warn("Response = ", response);

      if (response.didCancel || response.error) {
        console.warn("User cancelled/error image picker");
      } else {
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        console.warn("uri:" + response.uri);
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
      <Container>
        <Label>{this.props.title}</Label>
        <Copy>{this.props.description}</Copy>
        <View>{preview}</View>
        <UploadButtonContainer>
          <Button
            centerIcon="cloud-upload"
            style={{
              zIndex: 1000,

            }}
            onPress={() => this.openCameraRoll()}
          />
        </UploadButtonContainer>
        {getErrors(this.props.errors)}
      </Container>
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
  return <StyledUnsupportedText>{props.message}</StyledUnsupportedText>;
};
