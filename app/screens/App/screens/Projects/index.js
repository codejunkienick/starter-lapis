// @flow
import React from 'react';

import { NavLink, AppearRoute } from 'core';
import { SideProjects } from './screens';
import './index.css';

const Projects = ({ match }: any) =>
  <div>
    <h2>Projects</h2>
    <NavLink to={`${match.url}/side`}>to SideProjects</NavLink>
    <div style={{ paddingBottom: 40 }} />
    <AppearRoute path={`${match.url}/side`} component={SideProjects} />
  </div>;

export default Projects;
