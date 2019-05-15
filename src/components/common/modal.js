import React from "react";
import { Modal, View, ScrollView, ActivityIndicator } from "react-native";
import Button, { INTENT } from "../button";
import Container from "./container";
import Title from "./title";
export default props => {
  return (
    /*jshint ignore:start */
    <Modal
      animationType={"slide"}
      transparent={false}
      style={{ flex: 1 }}
      visible={props.visibility}
      onRequestClose={() => props.done(false)}
    >
      {(props.title && <Title>{props.title}</Title>) || null}
      {!props.hideDone ? (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {!props.busy ? (
              props.template
            ) : (
              <ActivityIndicator key={"indicator"} />
            )}
          </ScrollView>
          <Container style={{ justifyContent: "flex-end" }}>
            <Button
              title="OK"
              onPress={() => props.done(true)}
              intent={INTENT.ACCENT}
            />
          </Container>
        </View>
      ) : !props.busy ? (
        <View style={{ flex: 1 }}>{props.template}</View>
      ) : (
        <ActivityIndicator key={"indicator"} />
      )}
    </Modal>
    /*jshint ignore:end */
  );
};
