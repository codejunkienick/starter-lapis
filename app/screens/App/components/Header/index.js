import React, { Component } from 'react';
import './index.css';
import { NavLink } from 'core';

const Header = ({}) => {
  return (
    <div styleName="header">
      <NavLink styleName="logo" to="/">
        Starter Lapis
      </NavLink>
    </div>
  );
};

export default Header;
