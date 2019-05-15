import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Button, { INTENT } from "./button";
import Container from "./common/container";

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
        <Container>
          <Button
            onPress={props.submit}
            intent={INTENT.ACCENT}
            title={props.commandLabel && props.commandLabel.toUpperCase()}
          />
        </Container>
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
