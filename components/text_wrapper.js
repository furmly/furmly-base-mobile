import React from "react";
import { View, Text } from "react-native";

export default props => {
	return (
		<View
			style={{
				alignItems: "center",
				alignSelf:'stretch',
				flex:1,
				padding:10,
				justifyContent: "center"
			}}
		>
			<Text style={{ fontSize: 14, fontWeight: "bold" }}>
				{props.text}
			</Text>
		</View>
	);
};
