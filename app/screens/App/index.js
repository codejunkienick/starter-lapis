// @flow
import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import FontFaceObserver from 'fontfaceobserver';
import { Route } from 'react-router-dom';

import config from 'config';
import { actions } from 'redux/actions/app';
import { actions as userActions } from 'redux/actions/user';
import './index.css';
import { Header, Navigation } from './components';
import { About, Projects, Home } from './screens';

function loadFonts() {
  const roboto = new FontFaceObserver('Roboto');

  Promise.all([roboto.load()]).then(() => {
    document.body.className += ' fonts-loaded';
  });
}
class App extends Component {
  componentDidMount() {
    this.props.load();
  }
  componentWillMount() {
    // Observe loading and set proper styles when fonts have loaded
    // Fonts are added inside global.css
    loadFonts();
  }

  render() {
    const { testMsg } = this.props;
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
              ]}
            />
            <div styleName="routes">
              <Route exact path="/" component={Home} />
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
  state => ({ testMsg: state.getIn(['app', 'testMsg']) }),
  { ...actions },
)(App);
