import actionTypes from "./actionTypes";
import applyTheme from "../utils/applyTheme.ts";

// Action creators
export const setUserName = userName => {
  return {
    type: actionTypes.SET_USERNAME,
    userName
  };
};

export const setTimeFormat = timeFormat => {
  return {
    type: actionTypes.SET_TIMEFORMAT,
    timeFormat
  };
};

export const setTheme = theme => {
  applyTheme(theme);
  return {
    type: actionTypes.SET_THEME,
    theme
  };
};

export const toggleCtrlEnter = () => {
  return {
    type: actionTypes.TOGGLE_CTRL_ENTER
  };
};

export const resetToDefaults = () => {
  return {
    type: actionTypes.RESET_DEFAULTS
  };
};
