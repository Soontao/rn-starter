var package = require("../package")
var { exit } = require("process")
var { spawnSync } = require("child_process")
var readline = require("readline");
var { join } = require("path")
var { readFileSync, writeFileSync, existsSync, unlinkSync } = require("fs")
var cl = readline.createInterface(process.stdin, process.stdout);

var question = function (q) {
  return new Promise((res, rej) => {
    cl.question(q, answer => {
      res(answer);
    })
  });
};

const CHANGELOG_PATH = join(__dirname, "../CHANGELOG.md")
const APP_JSON_PATH = join(__dirname, "../app.json")
const PACKAGE_JSON_PATH = join(__dirname, "../package.json")
const ANDROID_PROJECT_PATH = join(__dirname, "../android")
const IOS_PROJECT_PATH = join(__dirname, "../ios")
const NAME_REG = /^[A-Za-z]+$/

var changeProjectName = function (newName) {
  var appJson = require(APP_JSON_PATH)
  var packageJson = require(PACKAGE_JSON_PATH)
  appJson.name = newName;
  appJson.displayName = newName;
  appJson.expo.slug = newName;
  packageJson.name = newName;
  packageJson.build = 0;
  packageJson.version = "1.0.0";
  if (existsSync(CHANGELOG_PATH)) {
    unlinkSync(CHANGELOG_PATH)
  }
  writeFileSync(APP_JSON_PATH, JSON.stringify(appJson, null, 2))
  writeFileSync(PACKAGE_JSON_PATH, JSON.stringify(package, null, 2))
  return;
};


(async function main() {
  if (!existsSync(ANDROID_PROJECT_PATH) && !existsSync(IOS_PROJECT_PATH)) {
    const newName = await question('give out new project name: ');
    if (newName) {
      if (NAME_REG.test(newName)) {
        changeProjectName(newName)
        console.log(`project name has changed to ${newName}`)
        console.log("please run 'generate-native-project' to generate ios/android folder")
        exit(0)
      } else {
        console.log("not acceptable name format")
        exit(0)
      }
    } else {
      console.log("empty name")
      exit(0)
    }
  } else {
    console.log("you have generated android & ios project, please change project name manually")
  }
})();
