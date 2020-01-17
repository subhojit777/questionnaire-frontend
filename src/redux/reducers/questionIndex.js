import {NAVIGATE} from '../actionTypes';

const initialState = {
  index: 0,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case NAVIGATE: {
      return {
        ...state,
        index: action.payload.index,
      };
    }

    default:
      return state;
  }
}
