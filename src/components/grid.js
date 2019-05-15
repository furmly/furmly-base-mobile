import React from "react";
import styled from "styled-components/native";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableOpacity
} from "react-native";
import Button, { INTENT } from "./button";
import SmallModal from "react-native-modalbox";
import Container from "./common/container";
import createToggleContainer from "./common/hideable-container";
import Title from "./common/title";
import StyledIcon from "./common/icon";
import { containerPadding } from "../variables";
const screen = Dimensions.get("window");
const styles = StyleSheet.create({
  gridContentStyle: {
    marginLeft: 8
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 20
  },
  gridHeaderStyle: {
    fontWeight: "bold"
  },
  seperator: {
    height: 1,
    backgroundColor: "#CED0CE"
  },
  addButton: {
    position: "absolute",
    right: 15,
    bottom: 20,
    zIndex: 1000,
    elevation: 0
    // alignItems: "flex-end"
  },
  flatList: {
    flex: 1
  },
  modal: {
    alignContent: "stretch",
    width: 0.6 * screen.width,
    height: 0.3 * screen.height,
    padding: 10,
    borderRadius: 4,
    borderWidth: 0
  },
  messageContainer: {
    flex: 1
  },
  messageText: {
    fontWeight: "bold",
    fontSize: 12
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  okButton: {
    position: "absolute",
    right: 0,
    bottom: 0
  },
  okButtonText: {
    alignSelf: "center"
  }
});

const HeaderContainer = styled.View`
  padding: ${containerPadding}px;
  flex-direction: column;
  margin-bottom: 8px;
  elevation: 3;
  background-color: #ffffff;
  border-bottom-width: 0.1px;
  border-color: #c3c3c3;
`;

const GridContainer = styled.View`
  flex: 1;
  margin: -${containerPadding}px;
`;

export const GridLayout = props => {
  return (
    <GridContainer>
      {props.list}
      {props.commandsView}
      {props.itemView}
      {props.commandResultView}
    </GridContainer>
  );
};

const keyExtractor = function(data) {
  return data._id;
};

export default class extends React.Component {
  renderSeparator = () => {
    return <View style={styles.seperator} />;
  };
  renderHeader = () => {
    return this.props.header || null;
  };
  templates = {
    basic: templateConfig => {
      let index = 0;
      return Object.keys(data.item).reduce((sum, x) => {
        if (!templateConfig || (templateConfig && templateConfig.config[x]))
          return (
            index++,
            sum.push(
              <View style={{ flexDirection: "row" }} key={index}>
                <Text style={styles.gridHeaderStyle}>
                  {templateConfig && templateConfig.config
                    ? templateConfig.config[x]
                    : x}
                </Text>
                <Text style={styles.gridContentStyle}>{data.item[x]}</Text>
              </View>
            ),
            sum
          );

        return sum;
      }, []);
    },
    noLabel: templateConfig => {
      let index = 0;
      return Object.keys(data.item).reduce((sum, x) => {
        if (!templateConfig || (templateConfig && templateConfig.config[x]))
          return (
            index++,
            sum.push(
              <View style={{ flexDirection: "row" }} key={index}>
                <Text style={styles.gridHeaderStyle}>{data.item[x]}</Text>
              </View>
            ),
            sum
          );

        return sum;
      }, []);
    }
  };
  renderItem = data => {
    return (
      <View style={{ flexDirection: "row", padding: 16 }}>
        <View style={{ flex: 3 }}>
          {this.templates[
            this.props.templateConfig ? this.props.templateConfig.name : "basic"
          ](this.props.templateConfig)}
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Button
            centerIcon="chevron-down"
            onPress={() => this.props.openCommandMenu(data.item)}
          />
        </View>
      </View>
    );
  };
  render() {
    let allElements = [
      <View style={styles.flatList} key={0}>
        <FlatList
          data={this.props.items}
          keyExtractor={keyExtractor}
          ItemSeparatorComponent={this.renderSeparator}
          ListHeaderComponent={this.renderHeader()}
          renderItem={this.renderItem}
          onEndReached={this.props.more}
          ListFooterComponent={this.props.footer}
          onEndReachedThreshold={0.5}
        />
      </View>
    ];

    if (this.props.canAddOrEdit) {
      allElements.unshift(
        <View key={1} style={styles.addButton}>
          <Button
            onPress={() => this.props.showItemView("NEW")}
            centerIcon="plus"
            style={{
              alignItems: "center",
              justifyContent: "center",
              width: 60,
              height: 60,
              borderRadius: 30,
              elevation: 24
            }}
            intent={INTENT.ACCENT}
            size={60}
          />
        </View>
      );
    }

    return <View style={{ flex: 1 }}>{allElements}</View>;
  }
}

const ToggleAbleContainer = createToggleContainer(props => (
  <TouchableOpacity onPress={props.toggle}>
    <StyledIcon
      name={!props.isOpen ? "filter" : "filter-outline"}
      style={{ alignSelf: "flex-end" }}
      size={32}
    />
  </TouchableOpacity>
));
export const GridHeader = props => {
  return (
    <HeaderContainer>
      <ToggleAbleContainer>
        <Title>{"Filters"}</Title>
        {props.children}
        <Container>
          <Button
            title={"APPLY"}
            intent={INTENT.ACCENT}
            onPress={props.filter}
          />
        </Container>
      </ToggleAbleContainer>
    </HeaderContainer>
  );
};

export const CommandBox = props => {
  if (props.commands) {
    let elements = props.commands.map((element, index) => {
      return (
        <Button
          key={index}
          title={element.commandText}
          onPress={() => props.execCommand(element)}
        />
      );
    });
    return (
      /*jshint ignore:start */
      <SmallModal
        animationType={"slide"}
        transparent={false}
        style={styles.modal}
        isOpen={props.visibility}
        backdropPressToClose={false}
      >
        <View style={styles.messageContainer}>
          <View style={styles.textContainer}>{elements}</View>
          <TouchableOpacity
            style={styles.okButton}
            onPress={() => props.close()}
          >
            <Text style={styles.okButtonText}>{"back"}</Text>
          </TouchableOpacity>
        </View>
      </SmallModal>
      /*jshint ignore:end */
    );
  }

  return null;
};
