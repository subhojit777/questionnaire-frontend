import {NAVIGATE} from './actionTypes';

let currentIndex = 0;

export const navigateForward = () => ({
  type: NAVIGATE,
  payload: {
    index: ++currentIndex,
  }
});

export const navigateBackward = () => ({
  type: NAVIGATE,
  payload: {
    index: --currentIndex,
  }
});
