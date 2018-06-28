import Raven from "raven-js";
import { Platform } from "react-native";
import { filter, split } from "lodash";

/**
 * please change this DSN token config in your own APP
 */

Raven
  .config("https://c875869102c44ec28c56e27d4005380a:6aceab1cbb694d8a9addfc276449f6fd@sentry.fornever.org/2", {
    allowSecretKey: true,
    autoBreadcrumbs: {
      xhr: false
    },
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
