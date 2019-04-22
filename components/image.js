import React from "react";
import { Image, View } from "react-native";
import imageLocation from "imageLocation";

export default props => {
  console.log(imageLocation);
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
            : imageLocation[props.args.config.data] || imageLocation["unknown"]
        }
        resizeMode="cover"
      />
    </View>
  );
};
