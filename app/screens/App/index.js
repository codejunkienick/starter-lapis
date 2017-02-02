// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import { Route } from 'react-router-dom';

import config from 'config';
import { actions } from 'redux/actions/app';
import './index.css';
import { PrivateRoute } from 'core';
import { Header, Navigation } from './components';
import { SecretSpace, NotFound, About, Projects, Home } from './screens';

type Props = {
  load: ActionCreator,
  isAuthenticated: boolean,
}

function loadFonts() {
  const roboto = new FontFaceObserver('Roboto');

  Promise.all([roboto.load()]).then(() => {
    document.body.className += ' fonts-loaded';
  });
}
class App extends Component {
  componentWillMount() {
    // Observe loading and set proper styles when fonts have loaded
    // Fonts are added inside global.css
    loadFonts();
  }
  componentDidMount() {
    this.props.load();
  }

  props: Props

  render() {
    const { isAuthenticated } = this.props;
    return (
      <div styleName="wrapper">
        <Helmet {...config.app.head} />
        <div styleName="app">
          <Header />
          <div styleName="content">
            <Navigation
              styleName="navigation"
              links={[
                { to: '/', text: 'Home' },
                { to: '/about', text: 'About' },
                { to: '/projects', text: 'Projects' },
                { to: '/secret', text: 'Secret', hide: !isAuthenticated },
              ]}
            />
            <div styleName="routes">
              <Route exact path="/" component={Home} />
              <Route path="/about" component={About} />
              <Route path="/projects" component={Projects} />
              <PrivateRoute path="/secret" component={SecretSpace} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  state => ({ isAuthenticated: state.getIn(['user', 'authenticated']) }),
  { ...actions },
)(App);

