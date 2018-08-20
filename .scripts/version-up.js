'use strict';

const fs = require('fs');
const { existsSync } = require("fs")
const argv = require('yargs').argv;
const readlineSync = require('readline-sync');

const helpers = require('react-native-version-up/lib/helpers');
const log = require('react-native-version-up/lib/log');

const pathToRoot = process.cwd();
const pathToPackage = argv.pathToPackage || `${pathToRoot}/package.json`;
const info = helpers.getPackageInfo(pathToPackage);

const pathToPlist = argv.pathToPlist || `${pathToRoot}/ios/${info.name}/Info.plist`;
const pathToGradle = argv.pathToGradle || `${pathToRoot}/android/app/build.gradle`;

// handle case of several plist files
const pathsToPlists = Array.isArray(pathToPlist) ? pathToPlist : [pathToPlist];

// detect directory exists
const androidDirectoryExist = existsSync(`${pathToRoot}/android`)
const iosDirectoryExist = existsSync(`${pathToRoot}/ios`)

// getting next version
const versionCurrent = info.version;
const versions = helpers.versions(versionCurrent);
let major = argv.keep ? versions[0] : helpers.version(versions[0], argv.major);
let minor = argv.keep ? versions[1] : helpers.version(versions[1], argv.minor, argv.major);
let patch = argv.keep ? versions[2] : helpers.version(versions[2], argv.patch, argv.major || argv.minor);
const version = `${major}.${minor}.${patch}`;

// getting next build number
const buildCurrent = info.build;
const build = buildCurrent + 1;

// getting commit message
const messageTemplate = argv.m || argv.message || 'release ${version}: increase versions and build numbers';
const message = messageTemplate.replace('${version}', version);

const changeBuildInPackage = (path, build) => {
  let packageContent = fs.readFileSync(path, 'utf8');
  packageContent = packageContent.replace(/("build":\s*)([\d\.]+)/g, `$1${build}`);
  fs.writeFileSync(path, packageContent, 'utf8');
}

log.info('\nI\'m going to increase the version in:');
log.info(`- package.json (${pathToPackage});`, 1);
log.info(`- ios project (${pathsToPlists.join(', ')});`, 1);
log.info(`- android project (${pathToGradle}).`, 1);

log.notice(`\nThe version will be changed:`);
log.notice(`- from: ${versionCurrent} (${buildCurrent});`, 1);
log.notice(`- to:   ${version} (${build}).`, 1);

if (version === versionCurrent) {
  log.warning('\nNothing to change in the version. Canceled.');
  process.exit();
}

helpers.changeVersionInPackage(pathToPackage, version);

changeBuildInPackage(pathToPackage, build)

if (iosDirectoryExist) {

  pathsToPlists.forEach(pathToPlist => {
    helpers.changeVersionAndBuildInPlist(pathToPlist, version, build);
  });

}

if (androidDirectoryExist) {

  helpers.changeVersionAndBuildInGradle(pathToGradle, version, build);

}

