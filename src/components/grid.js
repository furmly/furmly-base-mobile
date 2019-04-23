import React, { Component } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Dimensions,
  TouchableHighlight
} from "react-native";
import Button from "./button";
import SmallModal from "react-native-modalbox";
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
  headerContainer: {
    padding: 15,
    flexDirection: "column",
    marginBottom: 8,
    // paddingBottom: 0,
    elevation: 3,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 0.1,
    borderColor: "#C3C3C3"
  },
  addButton: {
    position: "absolute",
    right: 10,
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

export const GridLayout = props => {
  return <View style={{ flex: 1, margin: -15 }}>{props.children}</View>;
};

const keyExtractor = function(data) {
  return data._id;
};

export default props => {
  const renderSeparator = () => {
    return <View style={styles.seperator} />;
  };
  const renderHeader = () => {
    return props.header || null;
  };

  const renderItem = data => {
    const templates = {
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
    return (
      <View style={{ flexDirection: "row", padding: 16 }}>
        <View style={{ flex: 3 }}>
          {templates[
            props.templateConfig ? props.templateConfig.name : "basic"
          ](props.templateConfig)}
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
            onPress={() => props.openCommandMenu(data.item)}
          />
        </View>
      </View>
    );
  };
  let allElements = [
    <View style={styles.flatList} key={0}>
      <FlatList
        data={props.items}
        keyExtractor={keyExtractor}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        renderItem={renderItem}
        onEndReached={props.more}
        ListFooterComponent={props.footer}
        onEndReachedThreshold={0.5}
      />
    </View>
  ];

  if (props.canAddOrEdit) {
    allElements.unshift(
      <View key={1} style={styles.addButton}>
        <Button
          onPress={() => props.showItemView("NEW")}
          centerIcon="plus"
          style={{
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
            backgroundColor: "#FF0101",
            borderRadius: 100,
            elevation: 4
          }}
          color={"#FFFFFF"}
          size={60}
        />
      </View>
    );
  }

  return <View style={{ flex: 1 }}>{allElements}</View>;
};


export const GridHeader = props => {
  let buttonStyle = {
    borderWidth: StyleSheet.hairThin,
    borderColor: "#BEBEBE",
    backgroundColor: "#FFFFFF"
  };
  return (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>{"Filter "}</Text>
      {props.children}
      <View style={{ alignSelf: "stretch", flex: 1 }}>
        <Button
          title="search"
          color={"#000000"}
          style={buttonStyle}
          onPress={props.filter}
        />
      </View>
    </View>
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
          <TouchableHighlight
            style={styles.okButton}
            onPress={() => props.close()}
          >
            <Text style={styles.okButtonText}>{"back"}</Text>
          </TouchableHighlight>
        </View>
      </SmallModal>
      /*jshint ignore:end */
    );
  }

  return null;
};
