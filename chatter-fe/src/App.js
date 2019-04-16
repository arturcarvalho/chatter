import React, { Component } from "react";
import "./App.scss";
import { Provider } from "react-redux";
import Chat from "./components/Chat/Chat";
import throttle from "lodash/throttle";
import configureStore from "./store/configureStore";
import { saveState } from "./store/localStorage";

const store = configureStore();

// update localstore atmost once per second
store.subscribe(
  throttle(() => {
    saveState({ settings: store.getState().settings });
  }, 1000)
);

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Chat />
        </Provider>
      </div>
    );
  }
}

export default App;
