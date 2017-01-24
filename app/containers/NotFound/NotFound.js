import React from 'react';

export default function NotFound() {
  const styles = require('./NotFound.css');
  return (
    <div className="container">
      <h1 className={styles.header}>404</h1>
      <h1 className={styles.subheader}>Страница не найдена</h1>
    </div>
  );
}
