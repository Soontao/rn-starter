// @flow
import React from "react";
import { createDrawerNavigator, createStackNavigator } from "react-navigation";
import { Root, Toast, ActionSheet } from "native-base";
import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import { ErrorFallback } from "./components/ErrorFallback";
import "./library/NetworkDebugger";
import "./library/Sentry";

const Drawer = createDrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = createStackNavigator(
	{
		Login: { screen: Login },
		BlankPage: { screen: BlankPage },
		Drawer: { screen: Drawer },
	},
	{
		initialRouteName: "Login",
		headerMode: "none",
	}
);


export default () => (
	<Root>
		<ErrorFallback>
			<App />
		</ErrorFallback>
		<Toast ref={c => { Toast.toastInstance = c; }} />
		<ActionSheet ref={c => { ActionSheet.actionsheetInstance = c; }} />
	</Root>
);
