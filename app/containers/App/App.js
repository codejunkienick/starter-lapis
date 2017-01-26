// @flow
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import s from './App.css';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import config from '../../config';
import { actions } from 'redux/actions/app';
import { Route, Link } from 'react-router-dom'

const Home = () => (
  <div>
    <h2>Home</h2>
  </div>
)

class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.loadFonts();
  }

  componentDidMount() {
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
      <div styleName="s.app-wrap">
        <Helmet {...config.app.head} />
        <div styleName="s.app">
          { connectionError &&
              <div styleName="s.connection-error">
                <span>
                  Вы не в сети
                </span>
              </div>
          }
          <header styleName="s.header-landing">
            <Link to="/" styleName="s.logo">
              Starter Lapis
            </Link>
          </header>
          <div styleName="s.navigation">
          </div>
          <div styleName="s.appContent">
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
