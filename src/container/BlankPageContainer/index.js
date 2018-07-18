// @flow
import * as React from "react";
import BlankPage from "../../screens/BlankPage";
import { NavigationScreenProps } from "react-navigation";

export interface Props extends NavigationScreenProps { }

export interface State { }

export default class BlankPageContainer extends React.Component<Props, State> {

	render() {
		return <BlankPage navigation={this.props.navigation} />;
	}

}
