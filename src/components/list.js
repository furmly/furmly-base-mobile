import React, { Component } from "react";
import Button from "./button";
import {
	View,
	Text,
	ListView,
	ScrollView,
	Modal,
	ActivityIndicator,
	TouchableHighlight,
	TouchableNativeHighlight,
	StyleSheet
} from "react-native";
import { utils } from "furmly-client";

const formatUnicorn = utils.formatExpression;
const camelCaseToWord = string => {
	if (!string) return;
	return string.replace(/([A-Z]+)/g, " $1").replace(/^./, function(str) {
		return str.toUpperCase();
	});
};
const rowTemplates = {
	expression: (rowData, withoutLabel, dataTemplate, rowIndex) => {
		return (
			<View>
				<Text>{formatUnicorn(dataTemplate.exp, rowData)}</Text>
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
					<Text style={{ fontWeight: "bold" }}>
						{camelCaseToWord(x) + " "}
					</Text>
					<Text>
						{typeof rowData[x] == "object" ? "..." : rowData[x]}
					</Text>
				</Text>
			);
			/*jshint ignore:end */
		});
		return (
			/*jshint ignore:start */
			<View>{elements}</View>
			/*jshint ignore:end */
		);
	},
	includesImage: rowData => {
		let { image, ...rest } = rowData;
		return (
			/*jshint ignore:start */
			<View flex="1" flexDirection="row">
				<Image flex="1" />
				<View flex="3" flexDirection="column">
					{rowTemplates.basic({ ...rest }, true)}
				</View>
			</View>
			/*jshint ignore:end */
		);
	}
};
export default props => {
	return (
		/*jshint ignore:start */
		<ListView
			enableEmptySections={true}
			dataSource={new ListView.DataSource({
				rowHasChanged: (r1, r2) => r1 !== r2
			}).cloneWithRows(props.items || [])}
			renderRow={(rowData, sectionID, rowID) => (
				<TouchableHighlight
					onPress={() => !props.disabled && props.rowClicked(rowID)}
				>
					{rowTemplates[
						(props.rowTemplate && props.rowTemplate.name) || "basic"
					](
						rowData,
						false,
						props.rowTemplate && props.rowTemplate.config,
						rowID
					)}
				</TouchableHighlight>
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
			title="Add New Item"
			onPress={() => props.click()}
		/>

		/*jshint ignore:end */
	);
}
export function FurmlyListLayout(props) {
	return (
		/*jshint ignore:start */
		<View style={styles.listLayoutStyle}>
			<Text style={{ fontWeight: "bold" }}>{props.value}</Text>
			{props.children}
		</View>
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
					<ScrollView contentContainerStyle={{ padding: 15 }}>
						{!props.busy ? (
							props.template
						) : (
							<ActivityIndicator key={"indicator"} />
						)}
					</ScrollView>
					<Button
						title="ok"
						onPress={() => props.done(true)}
						style={{
							justifyContent: "center",
							alignItems: "center",
							borderWidth: 2,
							borderColor: "#BEBEBE"
						}}
					/>
				</View>
			) : !props.busy ? (
				<View style={{ flex: 1, padding: 15 }}>{props.template}</View>
			) : (
				<ActivityIndicator key={"indicator"} />
			)}
		</Modal>
		/*jshint ignore:end */
	);
}

const styles = StyleSheet.create({
	addButtonStyle: {
		backgroundColor: "#606060",
		padding: 10,
		alignItems: "center"
	},
	addButtonTextStyle: {
		color: "#ffffff",
		fontWeight: "bold",
		fontSize: 12
	},
	listLayoutStyle: {
		padding: 2
	}
});
