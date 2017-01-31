import React from "react";
import { Paragraph, Title } from "core";

const Project = ({title, content}) => {
  return (
    <div>
      <Title>{title}</Title>
      <Paragraph>{content}</Paragraph>
    </div>
  );
}

export default Project;
