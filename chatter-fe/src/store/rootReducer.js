import { combineReducers } from "redux";
import settings from "./settingsReducer";
import messages from "./messagesReducer";

const rootReducer = combineReducers({
  settings,
  messages
});

export default rootReducer;
