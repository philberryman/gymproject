import ReactDOM from "react-dom";
import React, { createContext, useState } from "react";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import { App } from "./NewComponents/App";

export const TokenContext = createContext();
export let token = 0;
export let setToken = {};

// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
let vh = window.innerHeight * 0.01;
// Then we set the value in the --vh custom property to the root of the document
document.documentElement.style.setProperty("--vh", `${vh}px`);

// We listen to the resize event
window.addEventListener("resize", () => {
  // We execute the same script as before
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});

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
