import ReactDOM from "react-dom";
import React, { createContext, useState } from "react";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { App } from "./NewComponents/App";

export const TokenContext = createContext();
export let token = 0;
export let setToken = {};

const Routes = () => {
  [token, setToken] = useState("");

  return (
    <TokenContext.Provider
      value={{
        value: token,
      }}
    >
      <App />
    </TokenContext.Provider>
  );
};

ReactDOM.render(<Routes />, document.getElementById("root"));
registerServiceWorker();
