const dev = require("./dev");
const test = require("./stage");
const prod = require("./prod");

// process.env means building pc's env
switch (process.env.__BUILD_ENV__ || "dev") {
  case "test":
  case "stage":
    global.Config = test;
    break;
  case "prod":
  case "production":
  case "release":
    global.Config = prod;
    break;
  default:
    global.Config = dev;
    break;
}
