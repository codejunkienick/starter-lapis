# LAPIS

Cutting edge starter kit optimized for development and production using latest tools available. 

## Features
* [React](https://github.com/facebook/react)
* [React Router@v4](https://github.com/ReactTraining/react-router/tree/v4) beta version
* [Webpack@2.2](http://webpack.github.io) for bundling
* [Express](http://expressjs.com)
* [Babel](http://babeljs.io) for ES6 and ES7 magic
* [Immutable.js](https://facebook.github.io/immutable-js) for enforcing immutable redux store and functional programming
* [Redux](https://github.com/reactjs/redux)
* [Redux Saga](https://github.com/yelouafi/redux-saga) for handling async api requests
* [Redux Dev Tools](https://github.com/gaearon/redux-devtools) for next generation DX (developer experience). Watch [Dan Abramov's talk](https://www.youtube.com/watch?v=xsSnOQynTHs).
* [ESLint](http://eslint.org) to maintain a consistent code style
* [style-loader](https://github.com/webpack/style-loader), 
* [postcss-loader](https://github.com/postcss/postcss-loader) to use postcss with cssnext and various plugins
* [react-helmet](https://github.com/nfl/react-helmet) to manage title and meta tag information on both server and client
* [babel-plugin-react-css-modules]() for better integration with css-modules without significant performance drop.
* [webpack-isomorphic-tools](https://github.com/halt-hammerzeit/webpack-isomorphic-tools) to allow require() work for statics both on client and server
* [webpack-dashboard]() for NASA style debugging
* [hard-source-webpack-plugin](https://github.com/mzgoddard/hard-source-webpack-plugin) to speed up initial build time
* [axios](https://github.com/mzabriskie/axios) for handling XHR calls. 

## Structure
* __client.js__ entry point for client rendering
* __server.js__ entry point for server rendering.
* __Html.js__ boilerplate html for clientside rendering and serverside rendering.
* __data__ folder is for anything related to handling api requests. index.js exports functions that return api calls wrapped in Promises. Right now **axios** is used for api client.
* __config__ folder is for configuration of client app. 
* __screens__ folder is for routes. I use [structure proposed by ryanflorence](https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346) with some modifications and it works great with react-router@v4 declarative structure.
* __redux__ do i need to explain that to you?
* __css__ any css classes that is shared among components and can be used through CSSModules syntax (e.g. composes: a from 'css/helpers.css')

```
app
├── client.js
├── server.js
├── constants.js
├── ServerTemplate.js
├── ClientTemplate.js
├── Html.js
├── config
│   ├── routes.js
│   └── index.js
├── screens
│   └── App
│       ├── components
│       ├── screens
│       │   ├── Admin
│       │   │   ├── components
│       │   │   ├── screens
│       │   │   │   ├── Reports
│       │   │   │   │   ├── components
│       │   │   │   │   └── index.js
│       │   │   │   └── Users
│       │   │   │       ├── index.js
│       │   │   │       └── styles.css
│       │   │   ├── index.js
│       │   │   └── styles.css
│       │   └── Course
│       │       ├── screens
│       │       │   └── Assignments
│       │       │       └── index.js
│       │       └── index.js
│       └── index.js
├── core
│   ├── utils
│   │    └── validation.js
│   ├── atoms
│   │   ├── Link
│   │   └── Icon
│   ├── molecules
│   │   └── IconLink
│   └── organisms
│       └── Header
├── redux
│   ├── createStore.js
│   ├── actions
│   │    ├── user.js
│   │    └── reports.js
│   ├── reducers
│   │    ├── user.js
│   │    └── reports.js
│   └── sagas
│        ├── user.js
│        └── reports.js
├── data
│   ├── apiClient.js
│   ├── user.js
│   └── index.js
└── css
    ├── global.css
    ├── variables.css
    └── helpers.css

```

## TODO
- [x] Basic route configuration
- [x] Client side rendering
- [x] Server-side rendering
- [ ] Code splitting with System.import()
- [ ] Transitions between routes
- [x] Rewrite production config in ES6
- [ ] Intgrate happypack
- [ ] Integrate jest for testing
- [ ] Add basic auth example with api and react-router
- [ ] Write test examples
- [ ] Integrate with Flow

## How to?

### How to enable/disable SSR

Check bin/server.js executable and change __DISABLE_SSR__ variable.


## Installation
```bash
npm install
```

## Running Dev Server
```bash
npm run dev-dll // Build libraries for faster webpack build
npm run dev
```

or with webpack-dashboard
```bash
npm run dev-dll // Build libraries for faster webpack build
npm run dev-dash
```

## Building and Running Production Server
```bash
npm run build
npm run start
```

### Thanks

Thanks to erikas for providing starting ground for my react learning. 
This starter resembles some code and a bit of structure from now outdated [erikas's starter kit](https://github.com/erikras/react-redux-universal-hot-example)
