import React from 'react';
import './index.css';
import { Link as RouterLink } from 'react-router';

const Link = ({ ...props }) => <RouterLink styleName="link" {...props} />;

export default Link;
