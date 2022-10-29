<p align="center">
  <img src="https://cdn.rawgit.com/alexdevero/electron-react-webpack-boilerplate/master/docs/images/electron-react-webpack-boilerplate.png" width="135" align="center">
  <br>
  <br>
</p>

## Clinic360 Online

Electron, React, PostCSS and Webpack app.

### Table of contents

- [Install](#install)
- [Pre-Usage](#pre-usage)
- [Usage](#usage)
- [Documentation](#documentation)

### Install

#### Clone this repo

```
git clone https://github.com/Health-36-AI/Clinic360-Online.git
```

#### Install dependencies

```
npm install
```

or

```
yarn
```

### Usage

#### Run the app

```
npm run start
```

or

```
yarn start
```

#### Build the app (automatic)

```
npm run package
```

or

```
yarn package
```

#### Build the app (manual)

```
npm run build
```

or

```
yarn build
```

#### Test the app (after `npm run build` || `yarn run build`)

```
npm run prod
```

```
yarn prod
```

#### Documentation 


### 1. Main.js
in this module we are initiating the app and trying to start a a stable connection with the backend and other modules
i've separated the module file into sections to document every section separately

## Section 1:
Starting the App and cheacking whether the user is logedin or not
