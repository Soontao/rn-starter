# React Native with Expo

Not standard expo application, only use it for previewing app.

with

* RN 0.51, Redux, Form, React Navigation ...
* NativeBase
* flow type
* Expo (only for preview)
* Jest

## install

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

change the name field in `package.json`, `app.json` & `index.expo.js`, and using vscode to replace features will be easier, please do not use symbols in name, for example `-`

## generate native app directory

for generating `android/ios` direcotry, with following command

```bash
react-native upgrade
```

## vscode 

I predefine some workspace settings in .vscode, and hope you like it.