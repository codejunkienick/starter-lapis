import React from 'react';
import { Route } from 'react-router';
import { TransitionMotion, spring } from 'react-motion';

const AppearRoute = ({ component: Component, ...rest }) => {
  const willLeave = () => ({ opacity: spring(0) });
  const willEnter = () => ({ opacity: 0 });

  return (
    <Route
      {...rest}
      children={({ location, match }) => (
        <TransitionMotion
          willLeave={willLeave}
          willEnter={willEnter}
          styles={
            match
              ? [{ key: location.pathname, style: { opacity: spring(1) }, data: match }]
              : []
          }
        >
          {interpolatedStyles => (
            <div>
              {interpolatedStyles.map(config => (
                <div key={config.key} style={{ ...config.style }}>
                  <Component {...config.data} />
                </div>
              ))}
            </div>
          )}
        </TransitionMotion>
      )}
    />
  );
};

export default AppearRoute;
