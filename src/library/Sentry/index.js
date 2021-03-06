import Raven from "raven-js";
import { Platform } from "react-native";
import { Config } from "../Config";

/**
 * please change this DSN token config in your own APP
 */

Raven
  .config(Config.SENTRY_URL, {
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

export const RavenLog = (msg: string) => Raven.captureMessage(msg, {
  level: "info"
});

export const RavenError = (err: Error, options = {}) => Raven.captureException(err, options);

export const RavenBread = (options: Raven.Breadcrumb) => Raven.captureBreadcrumb(options);

export {
  Raven
};
