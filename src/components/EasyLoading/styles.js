import { Dimensions, StyleSheet } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const SCREEN_HEIGHT = Dimensions.get("window").height;


export const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
    backgroundColor: "transparent",
    alignItems: "center",
    marginLeft: SCREEN_WIDTH / 2 - 50,
    marginTop: SCREEN_HEIGHT / 2 - 50,
    borderRadius: 10
  },
  progress: {
    position: "absolute",
    width: 100,
    height: 90
  },
  text: {
    marginTop: 70,
    color: "transparent",
  }
});
