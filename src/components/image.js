import React from "react";
import { Image, View } from "react-native";
import imageMap from "imageMap";

export default props => {
  return (
    <View
      style={{
        backgroundColor: "#560532",
        alignItems: "stretch"
      }}
    >
      <Image
        style={{ width: "100%", height: 250 }}
        source={
          props.args.type == "URL" || props.args.type == "DATA"
            ? { uri: props.args.config.data }
            : imageMap[props.args.config.data] || imageMap["unknown"]
        }
        resizeMode="cover"
      />
    </View>
  );
};
