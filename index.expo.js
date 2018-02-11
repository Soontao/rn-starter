import Expo from "expo";
import boot from "./src/boot";

if (process.env.NODE_ENV === "development") {
  Expo.KeepAwake.activate();
}

Expo.registerRootComponent(boot(true));
