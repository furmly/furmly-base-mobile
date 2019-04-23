import React, { Component } from "react";
import { View } from "react-native";
import Button from "./button";
import { FurmlyModal } from "./list";

export default props => {
	return (
		<View
			style={{
				flex: 1,
				alignItems: "stretch",
				justifyContent: "flex-start",
				elevation: 3
			}}
		>
			{props.children}

			<Button
				style={{
					justifyContent: "center",
					alignItems: "center",
					borderWidth: 1
				}}
				rightIcon={"arrow-right"}
				title={props.actionLabel || "go"}
				onPress={props.filter}
			/>
		</View>
	);
};

export const furmlyActionViewContent = Container => {
	return class extends Component {
		constructor(props) {
			super(props);
			this.modalClosed = this.modalClosed.bind(this);
			this.state = {
				showModal: this.props.elements && !!this.props.elements.length
			};
		}
		componentWillReceiveProps(next) {
			if (next.elements !== this.props.elements) {
				setTimeout(() => {
					this.setState({ showModal: true });
				}, 0);
			}
		}
		modalClosed() {
			this.setState({ showModal: false });
		}
		doNothing() {}
		render() {
			return (
				<FurmlyModal
					visibility={!!this.state.showModal}
					done={this.modalClosed}
					template={
						<Container
							elements={this.props.elements}
							validator={{}}
							value={this.props.value}
							valueChanged={this.doNothing}
						/>
					}
				/>
			);
		}
	};
};
