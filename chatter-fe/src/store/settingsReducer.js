import actionTypes from "./actionTypes";

const initialState = {
  userName: null,
  timeFormat: "12h",
  theme: "light",
  isCtrlEnterEnabled: false
};

function settings(state = initialState, action) {
  switch (action.type) {
    case actionTypes.SET_USERNAME:
      return {
        ...state,
        userName: action.userName
      };

    case actionTypes.SET_THEME:
      return {
        ...state,
        theme: action.theme
      };

    case actionTypes.SET_TIMEFORMAT:
      return {
        ...state,
        timeFormat: action.timeFormat
      };

    case actionTypes.TOGGLE_CTRL_ENTER:
      return {
        ...state,
        isCtrlEnterEnabled: !state.isCtrlEnterEnabled
      };

    case actionTypes.RESET_DEFAULTS:
      return { ...initialState };

    default:
      return state;
  }
}

export default settings;
