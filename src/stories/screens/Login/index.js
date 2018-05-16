// @flow
import * as React from "react";
import { Image, Platform } from "react-native";
import { Container, Content, Header, Body, Title, Button, Text, View, Icon, Footer } from "native-base";
import Getui from "react-native-getui";

export interface Props {
	loginForm: any,
	onLogin: Function,
}
export interface State { }

class Login extends React.Component<Props, State> {

	componentWillMount() {
		Getui.bindAlias("test");
	}

	componentWillUnmount() {
		Getui.unbindAlias("test");
		Getui.destroy();
	}

	render() {
		return (
			<Container>
				<Header style={{ height: 200 }}>
					<Body style={{ alignItems: "center" }}>
						<Icon name="flash" style={{ fontSize: 104 }} />
						<Title>React Native Starter</Title>
					</Body>
				</Header>
				<Content scrollEnabled={false} >
					{this.props.loginForm}
					<View padder>
						<Button block onPress={() => this.props.onLogin()}>
							<Text>Login</Text>
						</Button>
					</View>
				</Content>
				<Footer style={{ backgroundColor: "#F8F8F8" }}>
					<View style={{ alignItems: "center", opacity: 0.5, flexDirection: "row" }}>
						<View padder>
							<Text style={{ color: "#000" }}>From Open Source Community</Text>
						</View>
					</View>
				</Footer>
			</Container>
		);
	}
}

export default Login;
