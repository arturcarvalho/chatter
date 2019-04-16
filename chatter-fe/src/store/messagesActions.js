import actionTypes from "./actionTypes";

// Action creators

export const setMessages = messages => {
  return {
    type: actionTypes.SET_MESSAGES,
    messages
  };
};
