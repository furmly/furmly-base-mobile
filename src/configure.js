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
import FurmlyModal from "./components/common/modal";
import Indicator from "./components/activity_indicator.js";
import TextWrapper from "./components/text_wrapper.js";
import FurmlySelect from "./components/select.js";
import FurmlyLabel from "./components/label.js";
import ErrorText from "./components/error_label";
import FurmlyWebView from "./components/webview";
import Confirmation from "./components/confirmation";
import FurmlyList, {
  FurmlyListButton,
  FurmlyListModal,
  FurmlyListLayout
} from "./components/list.js";
import FurmlyLink from "./components/nav";
import FurmlyContainer from "./components/container";
import FurmlyMobileLabelWrapper from "./components/label_wrapper.js";
import FurmlySelectSetLayout from "./components/selectset";
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
import GrayProgressIndicator from "./components/common/progress_indicator";
import { SectionBody, SectionHeader } from "./components/section.js";

export default (
  { interceptors, extendLib, providerConfig = [] } = { providerConfig: [] }
) => {
  const maps = controlMap();
  const container = new Deferred("container");

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
    FurmlySelectSetLayout,
    FurmlySelect,
    GrayProgressIndicator,
    container
  ]);

  maps.addRecipe("LIST", [
    FurmlyListLayout,
    FurmlyListButton,
    FurmlyList,
    FurmlyListModal,
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
