import React from 'react';
import { NavLink as RouterNavLink } from 'react-router-dom';
import s from './index.css';

const NavLink = ({ ...props }) =>
  <RouterNavLink styleName="s.link" activeClassName={s.active} {...props} />;

export default NavLink;
