import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import "react-quill-new/dist/quill.snow.css";
import "./styles/quill.css";
import "./styles/datepicker.css";
import "./styles/ndatepicker.css";
import "./styles/print.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);