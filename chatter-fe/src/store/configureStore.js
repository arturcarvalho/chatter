import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { loadState } from "./localStorage";
const persistedState = loadState();

const configureStore = () => {
  /* eslint-disable no-underscore-dangle */
  return createStore(
    rootReducer,
    persistedState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // used to activate redux tools
  );
  /* eslint-enable */
};

export default configureStore;
