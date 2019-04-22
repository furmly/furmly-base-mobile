import React from "react";
import { WebView } from "react-native";
import config from "client_config";
export default props => {
  let url = decodeURIComponent(props.url || "");
  if (url && /(^\.+|^\/)/.test(url)) url = `${config.baseUrl}${url}`;

  return (
    <WebView
      source={{ uri: url || "http://www.google.com" }}
      style={{ marginTop: 2, flex: 1 }}
    />
  );
};
