// @flow
import React from 'react';
import { Project } from '../../shared';

const projects = [
  { id: 1, name: 'Side A', content: 'lorem ipsum' },
  { id: 2, name: 'Side B', content: 'dolor sit amet' },
];

const SideProjects = () => (
  <div>
    {projects.map(project => (
      <Project
        title={project.name}
        content={project.content}
        key={project.id}
      />
    ))}
  </div>
);

export default SideProjects;
