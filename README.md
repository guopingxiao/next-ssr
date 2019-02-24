A react ssr demp with ant-design based on Next.js.

## Directory

```
——————
  | -- asserts               // ant-design global less var
  | -- components            // React UI component
  | -- constants             // constant directory
      | -- ActionsTypes.js   // save all action type
      | -- ApiUrlForBE.js    // save all apiUrl
      | -- ...
  | -- containers            // React container component
  | -- core                  // mehtod dirctory
      | -- util.js           // project method
      | -- nextFetch.js      // packing unfetch for easy use
  | -- middlewares           // middlewares
      | -- client            // client middlewares, deal redux action
      | -- server            // server middlewares, deal node event
  | -- pages                 // Next.js routes
  | -- redux
      | -- actions           // deal all projectaction
      | -- reducers          // deal all project reducer
      | -- sagas             // sace all project saga
      | -- store.js
  | -- static                // save static source directory
  | -- .babelrc
  | -- .eslintrc
  | -- .gitignore
  | -- next.config.js        // Next.js config file
  | -- package.json
  | -- server.js             // server file
  | -- pm2.config.js         // pm2 deploy config file
  | ...                      // other file
```

## Usage

#### development

```
 1. git clone https://github.com/xiaoguoping/next-ssr.git
 2. yarn install
 3. yarn start
 // The application is ready on http://127.0.0.1:3006
```

#### production

```
 1. yarn build
 2. yarn prod
 // The application is ready on http://127.0.0.1:3006
```

> Pm2 is scheduled to be configured for project deployment

## Features

- react
- Next.js
- redux
- redux-saga
- ant-design
- fetch

## How to depoly application by pm2

```bash
# 1. install pm2
$ npm install -g pm2

# 2. build project
$ yarn build

# 3. pm2 deploy project
$ pm2 start pm2.config.js --env production
```
