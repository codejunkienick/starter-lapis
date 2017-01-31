// @flow
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import { Route, Link } from 'react-router-dom';

import './index.css';
import config from 'config';
import { actions } from 'redux/actions/app';
import { NavLink } from 'core';
import { Header, Navigation } from './components';
import { About, Projects } from "./screens";


class App extends Component {
  componentDidMount() {
    this.props.load();
  }
  componentWillMount() {
    this.loadFonts();
  }

  // Observe loading and set proper styles when fonts have loaded
  // Fonts are added inside global.css
  loadFonts() {
    const roboto = new FontFaceObserver('Roboto');

    Promise.all([roboto.load()]).then(() => {
      document.body.className += ' fonts-loaded';
    });
  }

  render() {
    const { connectionError, testMsg } = this.props;
    return (
      <div styleName="wrapper">
        <Helmet {...config.app.head} />
        <div styleName="app">
          <Header />
          <div styleName="content">
            <Navigation
              styleName="navigation"
              links={[
                { to: '/', text: 'About' },
                { to: '/projects', text: 'Projects' },
              ]}
            />
            <div styleName="routes">
              <Route exact path="/" component={About} />
              <Route path="/about" component={About} />
              <Route path="/projects" component={Projects} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state, ownProps) => ({ testMsg: state.getIn(['app', 'testMsg']) }),
  { ...actions }
)(App);
