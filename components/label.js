import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

let styles = StyleSheet.create({
	furmlyLabelStyle: {
		fontSize: 8,
		fontWeight: "bold"
	}
});
export default props => {
	return (
		/*jshint ignore:start */
		<Text
			style={StyleSheet.flatten(
				global.appStyle ? global.appStyle.furmlyLabelStyle : {},
				styles.furmlyLabelStyle
			)}
		>
			{props.description}
		</Text>
		/*jshint ignore:end */
	);
};
