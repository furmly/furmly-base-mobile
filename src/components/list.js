import React from "react";
import Button from "./button";
import {
  View,
  FlatList,
  ScrollView,
  Modal,
  ActivityIndicator,
  TouchableOpacity
} from "react-native";
import { utils } from "furmly-client";
import styled from "styled-components/native";
import { Label, Container } from "./label_wrapper";
import {
  dividerColor,
  minimumInputHeight,
  inputBackgroundColor,
  elementPadding
} from "../variables";

const formatExpression = utils.formatExpression;
const StyledDivider = styled.View`
  height: 0.8px;
  background-color: ${dividerColor};
`;
const ListLayout = styled.View`
  background-color: ${inputBackgroundColor};
  min-height: ${props => minimumInputHeight(props) * 2}px;
`;
const ItemContainer = styled.View`
  min-height: ${minimumInputHeight}px;
  flex-direction: row;
  align-items: center;
`;
const Text = styled.Text`
  padding-left: ${elementPadding}px;
`;
const camelCaseToWord = string => {
  if (!string) return;
  return string.replace(/([A-Z]+)/g, " $1").replace(/^./, function(str) {
    return str.toUpperCase();
  });
};
const keyExtractor = (item, index) => "" + index;
const rowTemplates = {
  expression: (rowData, withoutLabel, dataTemplate, index) => {
    return (
      <View>
        <Text>{formatExpression(dataTemplate.exp, rowData)}</Text>
      </View>
    );
  },
  basic: (rowData, withoutLabel) => {
    let elements = Object.keys(rowData).map(x => {
      /*jshint ignore:start */
      return withoutLabel ? (
        <Text>{rowData[x]}</Text>
      ) : (
        <Text>
          <Text style={{ fontWeight: "bold" }}>{camelCaseToWord(x) + " "}</Text>
          <Text>{typeof rowData[x] == "object" ? "..." : rowData[x]}</Text>
        </Text>
      );
      /*jshint ignore:end */
    });
    return (
      /*jshint ignore:start */
      <View>{elements}</View>
      /*jshint ignore:end */
    );
  }
};
const ListDivider = () => <StyledDivider />;
export default props => {
  return (
    /*jshint ignore:start */
    <FlatList
      data={props.items}
      ItemSeparatorComponent={ListDivider}
      keyExtractor={keyExtractor}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          onPress={() => !props.disabled && props.rowClicked(index)}
        >
          <ItemContainer>
            <View style={{ flex: 1 }}>
              {rowTemplates[
                (props.rowTemplate && props.rowTemplate.name) || "basic"
              ](item, true, props.rowTemplate && props.rowTemplate.config)}
            </View>
            <View style={{ alignSelf: "flex-end" }}>
              <Button
                centerIcon={"delete"}
                onPress={() => {
                  if (!props.disabled) {
                    props.rowRemoved(index);
                  }
                }}
              />
            </View>
          </ItemContainer>
        </TouchableOpacity>
      )}
    />
    /*jshint ignore:end */
  );
};
export function FurmlyListButton(props) {
  return (
    /*jshint ignore:start */

    <Button
      disabled={props.disabled}
      leftIcon="plus"
      title="Add"
      onPress={() => props.click()}
    />

    /*jshint ignore:end */
  );
}
export function FurmlyListLayout(props) {
  return (
    /*jshint ignore:start */
    <Container>
      <View style={{ flexDirection: "row" }}>
        <View
          style={{
            alignSelf: "center",
            flex: 1,
            justifyContent: "flex-start",
            flexDirection: "row"
          }}
        >
          <Label>{props.value}</Label>
        </View>
        <View style={{ alignSelf: "flex-end" }}>{props.addButton}</View>
      </View>
      <ListLayout>{props.list}</ListLayout>
      {props.modal}
      {props.confirmationModal}
    </Container>
    /*jshint ignore:end */
  );
}
export function FurmlyModal(props) {
  return (
    /*jshint ignore:start */
    <Modal
      animationType={"slide"}
      transparent={false}
      style={{ flex: 1 }}
      visible={props.visibility}
      onRequestClose={() => props.done(false)}
    >
      {!props.hideDone ? (
        <View style={{ flex: 1 }}>
          <ScrollView>
            {!props.busy ? (
              props.template
            ) : (
              <ActivityIndicator key={"indicator"} />
            )}
          </ScrollView>
          <Button
            title="OK"
            onPress={() => props.done(true)}
            style={{
              justifyContent: "center",
              alignItems: "center"
            }}
          />
        </View>
      ) : !props.busy ? (
        <View style={{ flex: 1 }}>{props.template}</View>
      ) : (
        <ActivityIndicator key={"indicator"} />
      )}
    </Modal>
    /*jshint ignore:end */
  );
}
