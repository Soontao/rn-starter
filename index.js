import { AppRegistry } from "react-native";
import App from "./App";
import packageJson from "./package.json";

AppRegistry.registerComponent(packageJson.name, () => App);
