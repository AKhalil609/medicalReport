import React from "react";
import "./App.css";
import { Provider } from "react-redux";
import store from "./store";
import Dash from "./components"

function App() {
  return (
    <Provider store={store}>
      <div className="App" data-test="component-app">
        <Dash/>
      </div>
    </Provider>
  );
}

export default App;
