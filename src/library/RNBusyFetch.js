import { StatusBar, Platform } from "react-native";

var request_count = 0;

const showHideStatusBarIndicator = (show: boolean) => {
  if (Platform.OS === "ios") {
    StatusBar.setNetworkActivityIndicatorVisible(show);
  }
};

const showProcess = () => {
  showHideStatusBarIndicator(true);
  // do ui process
};

const hideProcess = () => {
  showHideStatusBarIndicator(false);
  // do ui process
};

export const RNBusyFetch = async (url: string, init: RequestInit) => {

  request_count += 1;
  if (request_count < 2) {
    showProcess();
  }

  try {
    const res = await fetch(url, init);
    request_count -= 1;
    if (request_count < 1) {
      hideProcess();
    }
    return res;
  } catch (error) {
    request_count -= 1;
    if (request_count < 1) {
      hideProcess();
    }
    throw error;
  }

};

