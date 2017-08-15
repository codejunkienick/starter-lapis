// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import { Route, Switch, withRouter } from 'react-router-dom';
import type { Stack } from 'immutable';
import { slide as MenuSlide } from 'react-burger-menu';

import config from 'config';
import { PrivateRoute, NavLink } from 'core';
import { actions } from 'redux/actions/app';
import './index.css';
import { Header, Navigation, NotificationBar } from './components';
import {
  SecretSpace,
  NotificationCenter,
  NotFound,
  About,
  Projects,
  Login,
} from './screens';

type Props = {
  load: ActionCreator,
  isAuthenticated: boolean,
  notifications: Stack<Notification>,
  isNotificationsOpen: boolean,
  toggleNotifications: ActionCreator,
};

const slideMenuStyles = {
  bmBurgerButton: {
    display: 'none',
    position: 'fixed',
    width: '36px',
    height: '30px',
    left: '36px',
    top: '36px',
  },
  bmBurgerBars: {
    display: 'none',
    position: 'fixed',
    background: '#373a47',
  },
  bmCrossButton: {
    height: '24px',
    width: '24px',
  },
  bmCross: {
    background: '#666',
  },
  bmMenu: {
    background: '#f1f1f1',
    padding: '2.5em 0.75em 0 1.5em',
    fontSize: '1.15em',
  },
  bmMorphShape: {
    fill: '#373a47',
  },
  bmItemList: {
    color: '#b8b7ad',
    padding: '0.8em',
  },
  bmOverlay: {
    background: 'rgba(0, 0, 0, 0.3)',
  },
};

function loadFonts() {
  const roboto = new FontFaceObserver('Roboto');

  Promise.all([roboto.load()]).then(() => {
    if (document && document.body) {
      document.body.className += ' fonts-loaded';
    }
  });
}
class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMenuOpen: false,
    };
  }
  componentWillMount() {
    // Observe loading and set proper styles when fonts have loaded
    // Fonts are added inside global.css
    loadFonts();
  }
  componentDidMount() {
    this.props.load();
  }

  props: Props;

  toggleMenu = () => {
    this.setState(prevState => ({
      isMenuOpen: !prevState.isMenuOpen,
    }));
  };
  render() {
    const {
      isAuthenticated,
      isNotificationsOpen,
      toggleNotifications,
      notifications,
    } = this.props;
    const links = [
      { to: '/', text: 'About' },
      { to: '/login', text: 'Login' },
      { to: '/projects', text: 'Projects' },
      { to: '/notifications', text: 'Notification Center' },
      { to: '/secret', text: 'Secret', hide: !isAuthenticated },
    ];
    return (
      <div styleName="wrapper">
        <Helmet {...config.app.head} />
        <MenuSlide
          width={240}
          styles={slideMenuStyles}
          isOpen={this.state.isMenuOpen}>
          {links.map(
            link => !link.hide
              ? <li styleName="link" key={link.to}>
                <NavLink onClick={this.toggleMenu} strict to={link.to}>{link.text}</NavLink>
                </li>
              : null,
          )}
        </MenuSlide>
        <NotificationBar
          notifications={notifications}
          isNotificationsOpen={isNotificationsOpen}
          toggleNotifications={toggleNotifications}
          onBurgerClick={this.toggleMenu}
        />
        <div styleName="app">
          <Header />
          <div styleName="content">
            <Navigation styleName="navigation" links={links} />
            <div styleName="routes">
              <Switch>
                <Route exact path="/" component={About} />
                <Route path="/login" component={Login} />
                <Route path="/projects" component={Projects} />
                <Route path="/notifications" component={NotificationCenter} />
                <PrivateRoute path="/secret" component={SecretSpace} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withRouter(connect(
  state => ({
    notifications: state.getIn(['app', 'notifications']),
    isNotificationsOpen: state.getIn(['app', 'ui', 'isNotificationsOpen']),
    isAuthenticated: state.getIn(['user', 'authenticated']),
  }),
  { ...actions },
)(App));
