/*
	This file is used to map platform specific controls to to their furmly counterparts.
 */
import React from "react";
import controlMap, { Deferred } from "furmly-client";
import { View, Text, ActivityIndicator, ScrollView } from "react-native";
import FurmlyMobileInput, {
  FurmlyDatePicker,
  FurmlyCheckbox
} from "./components/input.js";
import FurmlyView, { Warning } from "./components/view.js";
import Indicator from "./components/activity_indicator.js";
import TextWrapper from "./components/text_wrapper.js";
import FurmlySelect from "./components/select.js";
import FurmlyLabel from "./components/label.js";
import ErrorText from "./components/error_label";
import FurmlyWebView from "./components/webview";
import Confirmation from "./components/confirmation";
import FurmlyList, {
  FurmlyListButton,
  FurmlyModal,
  FurmlyListLayout
} from "./components/list.js";
import FurmlyLink from "./components/nav";
import FurmlyContainer from "./components/container";
import FurmlyMobileLabelWrapper from "./components/label_wrapper.js";
import FurmlyImage from "./components/image";
import FurmlyHtmlView from "./components/html_view";
import FurmlyGridList, {
  GridLayout,
  GridHeader,
  CommandBox
} from "./components/grid";
import FurmlyFileUpload, {
  Previews,
  UnsupportedText
} from "./components/file_upload";
import FurmlyCommand, { startDownload } from "./components/command";
import FurmlyActionFilter from "./components/action_filter";

export default (
  { interceptors, extendLib, providerConfig = [] } = { providerConfig: [] }
) => {
  const maps = controlMap();
  const container = new Deferred("container");
  const GrayProgressIndicator = () => {
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
  };

  const SectionBody = props => {
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
          backgroundColor: "#FFFFFF"
        }}
      >
        {props.header}
        {props.content}
      </View>
    );
  };
  const SectionHeader = props => {
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
  maps.addCONTAINERRecipe([FurmlyContainer, TextWrapper, componentLocator]);
  maps.addVIEWRecipe([FurmlyView, Warning, container]);

  //map control for mobile input.
  maps.addRecipe("INPUT", [
    FurmlyMobileLabelWrapper,
    FurmlyMobileInput,
    FurmlyDatePicker,
    FurmlyCheckbox
  ]);

  //map control for mobile section.
  maps.addRecipe("SECTION", [SectionBody, SectionHeader, container]);

  //map control for process
  maps.addRecipe("PROCESS", [Indicator, TextWrapper, new Deferred("view")]);

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
    container
  ]);

  maps.addRecipe("LIST", [
    FurmlyListLayout,
    FurmlyListButton,
    FurmlyList,
    FurmlyModal,
    ErrorText,
    ActivityIndicator,
    Confirmation,
    container
  ]);
  maps.addRecipe("NAV", [FurmlyLink]);
  maps.addRecipe("LABEL", [FurmlyLabel]);
  maps.addRecipe("IMAGE", [FurmlyImage]);
  maps.addRecipe("GRID", [
    GridLayout,
    FurmlyGridList,
    FurmlyModal,
    GridHeader,
    ActivityIndicator,
    CommandBox,
    FurmlyModal,
    container
  ]);
  maps.addRecipe("FILEUPLOAD", [
    FurmlyFileUpload,
    ActivityIndicator,
    UnsupportedText,
    Previews
  ]);
  maps.addRecipe("WEBVIEW", [FurmlyWebView, Text]);
  maps.addRecipe("ACTIONVIEW", [
    ({ filter, content }) => (
      <ScrollView contentContainerStyle={{ alignItems: "stretch" }}>
        <View style={{ flexGrow: 1 }}>
          {filter}
          {content}
        </View>
      </ScrollView>
    ),
    ActivityIndicator,
    FurmlyActionFilter,
    container
  ]);
  maps.addRecipe("HTMLVIEW", [FurmlyHtmlView]);

  maps.addRecipe("COMMAND", [FurmlyCommand, startDownload]);

  //create provider
  maps.addPROVIDERRecipe([new Deferred("process"), ...providerConfig]);
  if (extendLib) {
    return extendLib(maps, maps._defaultMap, Deferred);
  }
  return maps.cook();
};
