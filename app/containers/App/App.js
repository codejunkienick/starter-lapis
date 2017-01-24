// @flow
import React, { Component, PropTypes } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import applyStyles from 'react-css-modules';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Helmet from 'react-helmet';
import { push, goBack } from 'react-router-redux';
import FontFaceObserver from 'fontfaceobserver';
import styles from './App.css';
import config from '../../config';
import { actions } from 'redux/actions/app';

@connect(
  (state, ownProps) => ({
    router: state.get('router'),
    location: ownProps.location
  }),
  {
    pushState: push,
    pushStateBack: goBack,
  }
)
@applyStyles(styles)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object.isRequired,
    pushState: PropTypes.func.isRequired,
  };

  componentWillMount() {
    this.loadFonts();
  }

  componentDidMount() {
    const { location: { pathname } } = this.props;
    if (!this.props.userLoaded) {
      this.props.loadUser(pathname);
    }
  }

  // Observe loading and set proper styles when fonts have loaded
  // Fonts are added inside global.css
  loadFonts() {
    const roboto = new FontFaceObserver('Roboto');

    Promise.all([roboto.load()]).then(() => {
      document.body.className += ' fonts-loaded';
    });
  }


  handleReconnect = () => {
    this.props.clearConnectionError();
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
            <Link to="/home" activeClassName={styles['active-link']}>Haome</Link>
          </div>
          <div styleName="appContent">
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}
