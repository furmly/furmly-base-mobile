import React from "react";
import styled from "styled-components/native";
import imageMap from "imageMap";
import Container from "./common/container";

const thumbnailWidth = 50;
const thumbnailWidthPx = `${thumbnailWidth}px`;
const avatarSize = thumbnailWidth * 2;
const avatarHeightPx = `${avatarSize}px`;
const avatarWidthPx = `${avatarSize}px`;
const avatarRadius = avatarSize / 2;
const Image = styled.Image`
  width: ${props =>
    (!props.uid && "100%") ||
    (props.uid === "THUMBNAIL" &&
      (props.theme.thumbnailWidth || thumbnailWidthPx)) ||
    (props.uid === "AVATAR" && (props.theme.avatarWidth || avatarWidthPx))};
  height: ${props =>
    (!props.uid && "250px") ||
    ((props.uid === "THUMBNAIL" &&
      (props.theme.thumbnailHeight || thumbnailWidthPx)) ||
      (props.uid === "AVATAR" &&
        (props.theme.avatarHeight || avatarHeightPx)))};
  border-radius: ${props =>
    (props.uid === "AVATAR" &&
      ((props.theme.avatarHeight && props.theme.avatarHeight / 2) ||
        avatarRadius)) ||
    0};
`;

export default props => {
  return (
    <Container
      style={{
        alignItems: "stretch"
      }}
    >
      <Image
        uid={props.uid}
        source={
          props.args.type == "URL" || props.args.type == "DATA"
            ? { uri: props.args.config.data }
            : imageMap[props.args.config.data] || imageMap["unknown"]
        }
        resizeMode="cover"
      />
    </Container>
  );
};
