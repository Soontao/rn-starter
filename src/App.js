// @flow
import React from "react";
import { StackNavigator, DrawerNavigator } from "react-navigation";
import { Root, Toast, ActionSheet } from "native-base";
import Login from "./container/LoginContainer";
import Home from "./container/HomeContainer";
import BlankPage from "./container/BlankPageContainer";
import Sidebar from "./container/SidebarContainer";
import "./library/NetworkDebugger";
import "./library/config";

const Drawer = DrawerNavigator(
	{
		Home: { screen: Home },
	},
	{
		initialRouteName: "Home",
		contentComponent: props => <Sidebar {...props} />,
	}
);

const App = StackNavigator(
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
		<App />
		<Toast ref={c => { Toast.toastInstance = c; }} />
		<ActionSheet ref={c => { ActionSheet.actionsheetInstance = c; }} />
	</Root>
);
