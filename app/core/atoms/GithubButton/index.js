import React from 'react';

const GithubButton = props => {
  const { user, style, repo, type, width, height, count, large } = props;
  let src = `https://ghbtns.com/github-btn.html?user=${user}&repo=${repo}&type=${type}`;
  if (count) src += '&count=true';
  if (large) src += '&size=large';

  return (
    <iframe
      src={src}
      frameBorder="0"
      allowTransparency="true"
      scrolling="0"
      width={width}
      height={height}
      style={{ border: 'none', width: width, height: height, ...style }}
    />
  );
};

export default GithubButton;
