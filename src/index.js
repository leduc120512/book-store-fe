import React from "react";
import { createRoot } from "react-dom/client"; // Import createRoot from react-dom/client
import App from "./App";
import GlobalStyle from "./compodens/glogbalstyle";
import reportWebVitals from "./reportWebVitals";
import AuthProvider from "./compodens/Layout/DefaultLayout/Login-LogOUT/LogOut/AuthProvider/AuthProvider"; // Adjusted path
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import store from "../src/compodens/Layout/DefaultLayout/Login-LogOUT/store/store";
const container = document.getElementById("root");
const root = createRoot(container); // Create a new root

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        {/* Providing Redux store */}
        <AuthProvider>
          {/* Wrapping with AuthProvider */}
          <GlobalStyle>
            <App />
          </GlobalStyle>
        </AuthProvider>
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);

// Start measuring performance in your app, pass a function to log results (e.g., reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log); // Log metrics to console
