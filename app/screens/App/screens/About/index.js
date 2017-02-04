import React from 'react';
import { GithubButton } from 'core';
import './index.css';

export default function About() {
  return (
    <div styleName="container">
      <h2 styleName="header">About</h2>
      <p>
        Cutting edge starter kit optimized for development and production using latest tools available.


        {' '}
      </p>
      <GithubButton
        user="codejunkienick"
        repo="starter-lapis"
        type="star"
        width="140"
        height="30"
        large
        count
        style={{
          marginBottom: 20,
        }}
      />

      <GithubButton
        user="codejunkienick"
        repo="starter-lapis"
        type="fork"
        width="140"
        height="30"
        large
        count
        style={{
          marginBottom: 20,
          marginRight: 10,
        }}
      />

      <h3>Features</h3>
      <ul>
        <li><a href="https://github.com/facebook/react">React</a></li>
        <li>
          <a href="https://github.com/ReactTraining/react-router/tree/v4">
            React Router@v4
          </a>
          {' '}beta version
        </li>
        <li><a href="http://webpack.github.io">Webpack@2.2</a> for bundling</li>
        <li><a href="http://expressjs.com">Express</a></li>
        <li><a href="http://babeljs.io">Babel</a> for ES6 and ES7 magic</li>
        <li>
          <a href="https://facebook.github.io/immutable-js">Immutable.js</a>
          {' '}for enforcing immutable redux store and functional programming
        </li>
        <li><a href="https://github.com/reactjs/redux">Redux</a></li>
        <li>
          <a href="https://github.com/yelouafi/redux-saga">Redux Saga</a>
          {' '}for handling async api requests
        </li>
        <li>
          <a href="https://github.com/gaearon/redux-devtools">
            Redux Dev Tools
          </a>
          {' '}for next generation DX (developer experience). Watch{' '}
          <a href="https://www.youtube.com/watch?v=xsSnOQynTHs">
            Dan Abramov&apos;s talk
          </a>
          .
        </li>
        <li>
          <a href="http://eslint.org">ESLint</a>
          {' '}to maintain a consistent code style
        </li>
        <li>
          <a href="https://github.com/webpack/style-loader">style-loader</a>,
        </li>
        <li>
          <a href="https://github.com/postcss/postcss-loader">postcss-loader</a>
          {' '}to use postcss with cssnext and various plugins
        </li>
        <li>
          <a href="https://github.com/nfl/react-helmet">react-helmet</a>
          {' '}
          to manage title and meta tag information on both server and client
        </li>
        <li>
          <a href="/codejunkienick/starter-lapis/blob/master">
            babel-plugin-react-css-modules
          </a>
          {' '}
          for better integration with css-modules without significant performance drop.
        </li>
        <li>
          <a href="https://github.com/halt-hammerzeit/webpack-isomorphic-tools">
            webpack-isomorphic-tools
          </a>
          {' '}to allow require() work for statics both on client and server
        </li>
        <li>
          <a href="/codejunkienick/starter-lapis/blob/master">
            webpack-dashboard
          </a>
          {' '}for NASA style debugging
        </li>
        <li>
          <a href="https://github.com/mzgoddard/hard-source-webpack-plugin">
            hard-source-webpack-plugin
          </a>
          {' '}to speed up initial build time
        </li>
        <li>
          <a href="https://github.com/mzabriskie/axios">axios</a>
          {' '}for handling XHR calls.{' '}
        </li>
      </ul>

      <h3>Structure</h3>
      <ul>
        <li><strong>client.js</strong> entry point for client rendering</li>
        <li><strong>server.js</strong> entry point for server rendering.</li>
        <li>
          <strong>Html.js</strong>
          {' '}
          boilerplate html for clientside rendering and serverside rendering.
        </li>
        <li>
          <strong>data</strong>
          {' '}
          folder is for anything related to handling api requests. index.js exports functions that return api calls wrapped in Promises. Right now


          {' '}
          <strong>axios</strong>
          {' '}is used for api client.
        </li>
        <li>
          <strong>config</strong> folder is for configuration of client app.
        </li>
        <li>
          <strong>screens</strong>
          {' '}folder is for routes. I use{' '}
          <a href="https://gist.github.com/ryanflorence/daafb1e3cb8ad740b346">
            structure proposed by ryanflorence
          </a>
          {' '}
          with some modifications and it works great with react-router@v4 declarative structure.
        </li>
        <li><strong>redux</strong> do i need to explain that to you?</li>
        <li>
          <strong>css</strong>
          {' '}
          any css classes that is shared among components and can be used through CSSModules syntax (e.g. composes: a from &apos;css/helpers.css)
        </li>
      </ul>

      <pre>
        <code>
          {
            `app
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
│       │   │   └── index.css
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
└── helpers.css`
          }
        </code>
      </pre>
    </div>
  );
}
