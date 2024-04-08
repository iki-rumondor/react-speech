import React from "react";
import ReactDOM from "react-dom/client";
import { LoadingProvider } from "./context/LoadingContext";
import App from "./App";
import { UtilsProvider } from "./context/UtilsContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UtilsProvider>
      <LoadingProvider>
        <App />
      </LoadingProvider>
    </UtilsProvider>
  </React.StrictMode>
);
