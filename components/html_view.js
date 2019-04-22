import React from "react";
import { WebView, Dimensions } from "react-native";
export default props => {
  let screenHeight = Dimensions.get("window").height;

  return (
    <WebView
      source={{ html: props.html, baseUrl: "/" }}
      style={{ marginTop: 2, height: screenHeight * 0.8 }}
    />
  );
};
