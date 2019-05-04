import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button from "./button";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch"
  },
  submitButtonLayoutStyle: {},
  warningWrapper: {
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center"
  },
  scrollView: {
    justifyContent: "flex-start",
    alignItems: "stretch"
  }
});

export default props => {
  if (props.hideSubmit)
    return <View style={styles.container}>{props.children}</View>;

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {props.children}
        <Button
          onPress={props.submit}
          centerIcon={"arrow-right"}
          title={props.commandLabel}
          color={"white"}
          style={{
            borderWidth: StyleSheet.hairThin,
            justifyContent: "center",
            backgroundColor: "#000000"
          }}
        />
      </ScrollView>
    </View>
  );
};

export const Warning = props => {
  return (
    <View style={styles.warningWrapper}>
      <Text>{props.message}</Text>
    </View>
  );
};
