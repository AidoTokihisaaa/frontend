import React, { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ShoppingListProvider } from "./context/ShoppingListContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CssBaseline } from "@mui/material";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <ShoppingListProvider>
      <CssBaseline />
      <App />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </ShoppingListProvider>
  </StrictMode>
);
