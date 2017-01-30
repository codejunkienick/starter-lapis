import React from 'react';
import s from './index.css';
import { NavLink as RouterNavLink } from 'react-router-dom';

const NavLink = ({ ...props }) => (
  <RouterNavLink styleName="s.link" activeClassName={s.active} {...props} />
);

export default NavLink;
