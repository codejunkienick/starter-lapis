import React from 'react';
import { Paragraph, Title } from 'core';

const Project = ({ title, content }) => (
  <div>
    <Title>{title}</Title>
    <Paragraph>{content}</Paragraph>
  </div>
);

export default Project;
