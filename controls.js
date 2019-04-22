/*
	This file is used to map platform specific controls to to their furmly counterparts.
 */
import React from "react";
import client_maps from "furmly-client";
import navigationActions from "./nav_actions";
import FurmlyMobileInput, {
  FurmlyDatePicker,
  FurmlyCheckbox
} from "./input.js";
import FurmlyView, { Warning } from "./view.js";
import Indicator from "./activity_indicator.js";
import TextWrapper from "./text_wrapper.js";
import FurmlySelect from "./select.js";
import FurmlyLabel from "./label.js";
import ErrorText from "./error_label";
import FurmlyWebView from "./webview";
import FurmlyList, {
  FurmlyListButton,
  FurmlyModal,
  FurmlyListLayout
} from "./list.js";
import FurmlyLink from "./nav";
import FurmlyContainer from "./container";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import FurmlyMobileLabelWrapper from "./label_wrapper.js";
import FurmlyImage from "./image";
import FurmlyHtmlView from "./html_view";
import FurmlyGridList, { GridLayout, GridHeader, CommandBox } from "./grid";
import FurmlyFileUpload, { Previews, UnsupportedText } from "./file_upload";
import FurmlyCommand, { startDownload } from "./command";
import FurmlyActionFilter, { furmlyActionViewContent } from "./action_filter";
import {
  MessengerLayout,
  MessengerPane,
  OpenChatsLayout,
  OpenChats,
  OpenNewChatButton,
  ContextMenu,
  ChatHistory,
  ChatLayout,
  ChatEditor,
  ContactList,
  LoginChat,
  AddNewContact,
  PendingInvites
} from "./messenger";

export default (interceptors, extendLib) => {
  const maps = client_map(),
    GrayProgressIndicator = () => {
      return (
        <View
          style={{
            height: 40,
            marginTop: 15,
            marginBottom: 15,
            backgroundColor: "#D8D8D8"
          }}
        />
      );
    },
    SectionBody = props => {
      return (
        <View
          style={{
            flexGrow: 1,
            elevation: 2,
            marginBottom: 10,
            marginTop: 10,
            paddingBottom: 10,
            paddingLeft: 10,
            paddingRight: 10,
            // borderBottomWidth: 1,
            // borderColor: "#B9B9B9",
            //borderRadius: 4,
            backgroundColor: "#FFFFFF"
          }}
        >
          {props.children}
        </View>
      );
    },
    SectionHeader = props => {
      return (
        <Text
          style={{
            fontSize: 18,
            fontWeight: "bold",
            borderBottomWidth: 0,
            //borderBottomColor: "#4A4A4A",
            paddingBottom: 5,
            marginBottom: 10,
            marginLeft: -10,
            marginRight: -10,
            padding: 10,
            backgroundColor: "#F9F9F9"
          }}
        >
          {props.children}
        </Text>
      );
    };
  const componentLocator = maps.componentLocator(interceptors);
  const defaultContainer = maps.CONTAINER(
    FurmlyContainer,
    Text,
    componentLocator
  );
  maps.VIEW = maps.VIEW(FurmlyView, Warning, defaultContainer);
  //maps.addRecipe("VIEW",[FurmlyView, defaultContainer]);
  //map control for mobile input.
  maps.addRecipe("INPUT", [
    FurmlyMobileLabelWrapper,
    FurmlyMobileInput,
    FurmlyDatePicker,
    FurmlyCheckbox
  ]);

  //map control for mobile section.
  maps.addRecipe("SECTION", [SectionBody, SectionHeader, defaultContainer]);

  //map control for process
  maps.addRecipe("PROCESS", [Indicator, TextWrapper, maps.VIEW]);

  //map control for select
  maps.addRecipe("SELECT", [
    GrayProgressIndicator,
    FurmlyMobileLabelWrapper,
    FurmlySelect
  ]);

  //map control for selectset
  maps.addRecipe("SELECTSET", [
    FurmlyMobileLabelWrapper,
    FurmlySelect,
    GrayProgressIndicator,
    defaultContainer
  ]);

  maps.addRecipe("LIST", [
    FurmlyListLayout,
    FurmlyListButton,
    FurmlyList,
    FurmlyModal,
    ErrorText,
    ActivityIndicator,
    defaultContainer
  ]);
  maps.addRecipe("NAV", [FurmlyLink, navigationActions]);
  maps.addRecipe("LABEL", [FurmlyLabel]);
  maps.addRecipe("IMAGE", [FurmlyImage]);
  maps.addRecipe("GRID", [
    GridLayout,
    FurmlyGridList,
    FurmlyModal,
    GridHeader,
    ActivityIndicator,
    CommandBox,
    navigationActions,
    FurmlyModal,
    defaultContainer
  ]);
  maps.addRecipe("FILEUPLOAD", [
    FurmlyFileUpload,
    ActivityIndicator,
    UnsupportedText,
    Previews
  ]);
  maps.addRecipe("WEBVIEW", [FurmlyWebView, Text]);
  maps.addRecipe("ACTIONVIEW", [
    ({ children }) => (
      <ScrollView contentContainerStyle={{ alignItems: "stretch" }}>
        <View style={{ flexGrow: 1 }}>{children}</View>
      </ScrollView>
    ),
    ActivityIndicator,
    FurmlyActionFilter,
    defaultContainer,
    furmlyActionViewContent(defaultContainer)
  ]);
  maps.addRecipe("HTMLVIEW", [FurmlyHtmlView]);
  maps.addRecipe("MESSENGER", [
    MessengerLayout,
    MessengerPane,
    OpenChats,
    ChatEditor,
    ContextMenu,
    OpenNewChatButton,
    OpenChatsLayout,
    FurmlyModal,
    ActivityIndicator,
    LoginChat,
    ContactList,
    ChatHistory,
    AddNewContact,
    PendingInvites,
    ChatLayout
  ]);
  maps.addRecipe("COMMAND", [FurmlyCommand, startDownload]);
  if (extendLib) {
    return extendLib(maps, maps._defaultMap);
  }
  return maps.cook();
};
