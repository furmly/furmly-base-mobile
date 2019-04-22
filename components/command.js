import React from "react";
import { PermissionsAndroid } from "react-native";
import RNFetchBlob from "react-native-fetch-blob";
import Button from "./button";
const SHOW_MESSAGE = "SHOW_MESSAGE";
const needed = [
  {
    permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    title: "Download requires this permission",
    message:
      "This permission is needed to enable downloads of Excel,PDF documents etc."
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    title: "Download requires this permission",
    message:
      "This permission is needed to enable downloads of Excel,PDF documents etc."
  }
];

async function requestPermission({ permission, title, message }) {
  try {
    const granted = await PermissionsAndroid.request(permission, {
      title,
      message
    });
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.warn(err);
    throw err;
  }
}

async function checkPermission(permission) {}

export default props => {
  return (
    <Button centerIcon={props.icon} title={props.text} onPress={props.go} />
  );
};

async function ensurePermissions() {
  for (var i = needed.length - 1; i >= 0; i--) {
    const v = await checkPermission(needed[i].permission);
    if (!v) {
      let granted = await requestPermission(needed[i]);
      if (!granted) return false;
    }
  }
  return true;
}
export function startDownload(args, downloadUrl) {
  return (dispatch, getState) => {
    ensurePermissions().then(result => {
      if (!result)
        return dispatch({
          type: SHOW_MESSAGE,
          message: "You have to grant permissions for downloads to work"
        });

      let options = JSON.parse(args.commandProcessorArgs);
      let state = getState();
      let dirs = RNFetchBlob.fs.dirs;
      RNFetchBlob.config({
        fileCache: false,
        appendExt: "xlsx",
        path: (dirs.SDCardDir || dirs.DocumentDir) + "/furmly/something.xlsx",
        addAndroidDownloads: {
          useDownloadManager: false, // <-- this is the only thing required
          // Optional, override notification setting (default to true)
          notification: true,
          title: options.description,
          // Optional, but recommended since android DownloadManager will fail when
          // the url does not contains a file extension, by default the mime type will be text/plain
          mime: options.mime,
          description: options.description,
          mediaScannable: true
        }
      })
        .fetch(
          "GET",
          downloadUrl,
          (state.authentication &&
            state.authentication.credentials && {
              Authorization: `Bearer ${
                state.authentication.credentials.access_token
              }`
            }) ||
            null
        )
        .then(resp => {
          // the path of downloaded file
          dispatch({ type: SHOW_MESSAGE, message: resp.path() });
        })
        .catch(e => {
          dispatch({
            type: SHOW_MESSAGE,
            message:
              "An Error has occurred while downloading file:" + e.toString()
          });
        });
    });
  };
}
