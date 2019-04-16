import actionTypes from "./actionTypes";
const initialState = {
  messages: []
};

function messages(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_MESSAGES:
      return {
        ...state,
        messages: action.messages
      };

    default:
      return state;
  }
}

export default messages;
