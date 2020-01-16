import {NAV_FORWARD, NAV_BACKWARD} from '../actionTypes';

const initialState = {
  index: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NAV_FORWARD: {
      return {
        ...state,
        index: state.index + 1,
      };
    }

    case NAV_BACKWARD: {
      return  {
        ...state,
        index: state.index - 1,
      }
    }

    default:
      return state;
  }
}
