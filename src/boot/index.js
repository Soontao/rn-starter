// @flow
import "../library/NetworkDebugger";

export default function (isExpo: boolean = false) {
	return isExpo ? require("./setup.expo").default : require("./setup").default;
}
