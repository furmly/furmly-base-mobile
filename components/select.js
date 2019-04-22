import React, { Component } from "react";
import { Picker, View } from "react-native";
import { getErrors } from "./input";

export default class extends Component {
	constructor(props) {
		super(props);
	}
	render() {
		/*jshint ignore:start */

		let elements = (this.props.items || []).map(
			(e => {
				return (
					<Picker.Item
						key={e[this.props.keyProperty]}
						label={"" + e[this.props.displayProperty]}
						value={e[this.props.keyProperty]}
					/>
				);
			}).bind(this)
		);
		elements.unshift(<Picker.Item key="..." label="None" value="" />);
		return (
			<View style={{ flex: 1 }}>
				<Picker
					enabled={!this.props.disabled}
					selectedValue={this.props.value}
					onValueChange={this.props.valueChanged}
				>
					{elements}
				</Picker>
				{getErrors(this.props.errors)}
			</View>
		);
		/*jshint ignore:end */
	}
}
