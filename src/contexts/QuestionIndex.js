import * as React from "react";

export const defaultPosition = 0;
export const QuestionIndex = React.createContext({
  currentPosition: defaultPosition,
  moveForward: () => {},
  moveBackward: () => {},
});
