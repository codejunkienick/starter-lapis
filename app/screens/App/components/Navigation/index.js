// @flow
import React from 'react';
import './index.css';
import { NavLink } from 'core';

const Navigation = ({ links, className }) => (
  <nav className={className} styleName="navigation">
    <ul styleName="links">
      {links.map(link => (
        <li styleName="link-wrap">
          <NavLink styleName="link" to={link.to}>{link.text}</NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Navigation;
