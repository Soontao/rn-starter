/**
 * EasyLoading
 *
 * inspired by https://github.com/Yenole/react-native-easy-loading
 *
 */

import React from "react";
import { Text, View, Modal, ActivityIndicator } from "react-native";
import { styles } from "./styles";

export class EasyLoading {

  static bind(loading, key = "default") {
    loading && (this.map[key] = loading);
  }

  static unBind(key = "default") {
    this.map[key] = null;
    delete this.map[key];
  }

  /**
   * show loading modal
   *
   * @param {string} text visible text content
   * @param {number} timeout timeout duration
   * @param {string} key Loading key
   */
  static show(text = "Loading...", timeout = -1, key = "default") {
    this.map[key] && this.map[key].setState({ "isShow": true, "text": text, "timeout": timeout });
  }

  /**
   * hide loading modal
   *
   * @param {string} key Loading key
   */
  static hide(key = "default") {
    this.map[key] && this.map[key].setState({ "isShow": false });
  }

}

EasyLoading.map = {};

export class Loading extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      timeout: -1,
      text: "Loading..."
    };
    EasyLoading.bind(this, this.props.type || "default");
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
    EasyLoading.unBind(this.props.type || "default");
  }

  timer: NodeJS.Timer

  render() {

    clearTimeout(this.timer); // clear previous timer

    if (this.state.timeout !== -1) {
      this.timer = setTimeout(() => {
        EasyLoading.dismis(this.props.type || "default");
      }, this.state.timeout);
    }

    return (
      <Modal
        animationType={"fade"}
        transparent={true}
        visible={this.state.isShow}
        onRequestClose={() => { }}>
        <View style={[styles.box, this.props.loadingStyle]}>
          <ActivityIndicator animating={true} color={this.props.color || "grey"} size={"large"} style={styles.progress} />
          <Text style={[styles.text, this.props.textStyle]}>{this.state.text}</Text>
        </View>
      </Modal>
    );

  }
}

