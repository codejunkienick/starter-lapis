// @flow
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import './index.css';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import config from '../../config';
import { actions } from 'redux/actions/app';
import { Route, Link } from 'react-router-dom'
import Home from './Home';

class App extends Component {
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
    const { connectionError, location } = this.props;
    return (
      <div styleName="app-wrap">
        <Helmet {...config.app.head} />
        <div styleName="app">
          { connectionError &&
              <div styleName="connection-error">
                <span>
                  Вы не в сети
                </span>
              </div>
          }
          <header styleName="header-landing">
            <Link to="/" styleName="logo">
              Starter Lapis
            </Link>
          </header>
          <div styleName="navigation">
          </div>
          <div styleName="appContent">
            <Route exact path="/" component={Home} />
          </div>
        </div>
      </div>
    );
  }
}
export default connect(
  (state, ownProps) => ({

  }),
)(App)
