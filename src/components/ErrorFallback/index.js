import React, { Component } from "react";
import { Raven, RavenError } from "../../library/Sentry/index";
import { View, Text } from "react-native";


export class ErrorFallback<P={}, S={}, SS=any> extends Component<P, S, SS> {

  state = {
    errorOccured: false
  }

  componentDidCatch(error, info) {
    RavenError(error, { extra: info });
    this.setState({ errorOccured: true });
  }

  render() {
    const { errorOccured } = this.state;
    if (errorOccured) {
      return <View>
        <Text>
          错误发生啦~
        </Text>
      </View>;
    } else {
      return this.props.children;
    }
  }

}
