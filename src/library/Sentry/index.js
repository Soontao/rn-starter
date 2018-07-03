import Raven from "raven-js";
import { Platform } from "react-native";

/**
 * please change this DSN token config in your own APP
 */

Raven
  .config("https://358f593f19344f219d06a59b6321f17d:32f6820621b147f59f66d5510ff0ffe3@sentry.fornever.org/2", {
    allowSecretKey: true,
    maxBreadcrumbs: 20,
    maxMessageLength: 200,
    dataCallback: data => {
      data.contexts = data.contexts || {};

      // add os info
      data.contexts.os = Object.assign(data.contexts.os || {}, {
        name: Platform.OS,
        version: Platform.Version,
      });

      // data.exception.values[0].value = split(data.exception.values[0].value, "\n")[0];
      // react native error stack is different, so need update
      return data;
    },
  })
  .install()
  .addPlugin(require("./plugin"), {
    nativeClientAvailable: false,
  });


export const info = (msg: string) => Raven.captureMessage(msg, { level: "info" });

export const error = (msg: string) => Raven.captureMessage(msg);

export { Raven };
