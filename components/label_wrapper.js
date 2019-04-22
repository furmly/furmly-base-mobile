import PropTypes from "prop-types";
import React, { Component } from "react";
import { Text, View } from "react-native";

class Label extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		return (
			/*jshint ignore:start */
			<View style={{ flex: 1, justifyContent: "flex-start" }}>
				<Text style={{ fontWeight: "bold" }}>{this.props.value}</Text>
				{this.props.inner}
				{this.props.extraElements}
			</View>
			/*jshint ignore:end */
		);
	}
}

Label.propTypes = {
	value: PropTypes.string.isRequired,
	inner: PropTypes.object.isRequired
};

export default Label;
