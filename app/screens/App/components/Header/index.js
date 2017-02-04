import React from 'react';
import { NavLink } from 'core';
import './index.css';

const Header = () => (
  <div styleName="header">
    <NavLink styleName="logo" to="/">
      Starter Lapis
    </NavLink>
  </div>
);

export default Header;
