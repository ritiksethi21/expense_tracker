import React from "react";
import ReactDOM from "react-dom";

import App from "./App";
import { Provider } from "./context/context";
import "./index.css";

import { SpeechProvider } from "@speechly/react-client";

ReactDOM.render(
  <SpeechProvider appId="c6126b9b-a0ea-4f72-9cc4-4451fd544b15" language="en-US" >
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById("root")
);
