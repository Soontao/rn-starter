// @flow
import * as React from "react";
import { StyleProvider } from "native-base";
import { Provider } from "react-redux";
import { View } from "react-native";

import configureStore from "./configureStore";
import App from "../App";
import getTheme from "../theme/components";
import variables from "../theme/variables/platform";

export interface Props { }
export interface State {
  store: Object;
  isLoading: boolean;
}

export default class Setup extends React.Component<Props, State> {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      store: configureStore(() => this.setState({ isLoading: false }))
    };
  }

  render() {
    return (
      <StyleProvider style={getTheme(variables)}>
        <Provider store={this.state.store}>
          {this.state.isLoading ? <View /> : <App />}
        </Provider>
      </StyleProvider>
    );
  }
}
