// @flow
import React from 'react';
import { Paragraph, Title } from 'core';

type Props = {
  title: string,
  content: string
};

const Project = ({ title, content }: Props) =>
  <div>
    <Title>
      {title}
    </Title>
    <Paragraph>
      {content}
    </Paragraph>
  </div>;

export default Project;
