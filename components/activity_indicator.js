import React, { Component } from "react";
import { ActivityIndicator, View,Text } from "react-native";

export default class extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			/*jshint ignore:start */
			<View alignItems = 'center'>
				<ActivityIndicator size="large" />
				<Text>{this.props.title}</Text>
			</View>
			/*jshint ignore:end */
		);
	}
}
