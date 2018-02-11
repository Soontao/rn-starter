// @flow
import app from "./setup";
import expoApp from "./setup.expo.js";

export default function (isExpo: boolean = false) {
	return isExpo ? expoApp : app;
}
