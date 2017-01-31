import React from 'react';
import './index.css';
import { SideProjects } from './screens';
import { NavLink } from 'core';
import { Route } from 'react-router'

const Projects = ({match}) => {
  return (
    <div>
      <h2>Projects</h2>
      <NavLink to={`${match.url}/side`}>to SideProjects</NavLink>
      <Route path={`${match.url}/side`} component={SideProjects} />
    </div>
  );
};

export default Projects;
