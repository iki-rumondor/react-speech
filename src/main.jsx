import React from "react";
import ReactDOM from "react-dom/client";
import { LoadingProvider } from "./context/LoadingContext";
import App from "./App";
import { UtilsProvider } from "./context/UtilsContext";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UtilsProvider>
      <LoadingProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <App />
        </LocalizationProvider>
      </LoadingProvider>
    </UtilsProvider>
  </React.StrictMode>
);
