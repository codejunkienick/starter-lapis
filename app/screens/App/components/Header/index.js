import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'core';

const Header = ({}) => {
  return (
    <div styleName="header">
      <NavLink to="/">
        StarterLapis
      </NavLink>
    </div>
  );
};

export default Header;
