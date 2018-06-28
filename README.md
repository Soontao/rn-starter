# React Native starter with Expo

[![CircleCI](https://circleci.com/gh/Soontao/rn-starter/tree/master.svg?style=shield)](https://circleci.com/gh/Soontao/rn-starter/tree/master)

Not standard expo application, only use it for previewing app.

with following libs:

* RN 0.55, Redux (with persist), Form, React Navigation ...
* NativeBase components
* flow type check
* Expo 27 (only for preview)
* Jest unit tests
* Sentry error log

CI tested with node v6,7,8,9

## install

**please make sure your nodejs version >= 6**

clone this repo & npm i

```bash
npm i
```

maybe vscode will notify you some eslint module lost in global env, just install these. :) .

now, just run:

```bash
npm start
```

Your shell will show a QR code after a moment, and use [Expo App](https://expo.io/tools#client) to scan it, app will works on your phone.

## rename your package

change the name field in `package.json`, `app.json` & `index.js`, and using vscode to replace features will be easier, please do not use symbols in name, for example `-`

or just use `npm run newName` and input newName, then, related js files will be changed.

## generate native app projects

for generating `android/ios` directory, with following command

```bash
react-native upgrade
```

## vscode config

I pre-defined some workspace settings in .vscode, and hope you like it.

## sentry error log

I introduced Sentry in this project for error log, for your own project, please change the DSN of `library/Sentry/index.js`, and use 

* Sentry.captureMessage
* Sentry.captureException
* Sentry.captureBreadcrumb

methods to upload some messages to sentry server.

And you can use 

* Sentry.setUserContext
* Sentry.setTagsContext
* Sentry.setVersion

methods to set messages context env

## comments

without flow-type plugin, you will have better develop experence.

As well known, you can't use any native module in Expo client app, just develop them with AS or XCode and run on real devices.