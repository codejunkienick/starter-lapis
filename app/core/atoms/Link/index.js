import React from 'react';
import { Link as RouterLink } from 'react-router';
import './index.css';

const Link = ({ ...props }) => <RouterLink styleName="link" {...props} />;

export default Link;
