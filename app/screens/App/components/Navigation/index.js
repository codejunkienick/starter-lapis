// @flow
import React from 'react';
import './index.css';
import { NavLink } from 'core';

const Navigation = ({ links }) => {
  return (
    <div styleName="navigation">
      {links.map(link => <NavLink to={link.to}>{link.text}</NavLink>)}
    </div>
  );
};

export default Navigation;
