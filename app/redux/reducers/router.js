import Immutable from 'immutable';
import { LOCATION_CHANGE } from 'react-router-redux';

const initialState = Immutable.fromJS({ locationBeforeTransitions: null });

export default (state = initialState, action) => {
  if (action.type === LOCATION_CHANGE) {
    return state.merge({
      locationBeforeTransitions: action.payload,
      prevLocation: state ? state.get('locationBeforeTransitions') : null,
      locationChanged: state &&
        state.get('locationBeforeTransitions') &&
        state.get('locationBeforeTransitions').get('pathname') !==
          action.payload.pathname,
    });
  }

  return state;
};
