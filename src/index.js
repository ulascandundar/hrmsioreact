import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { ToastProvider } from "react-toast-notifications";
import { configureStore } from "./store/configureStore";
import { Provider } from "react-redux"


const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ToastProvider>
            <App />
            </ToastProvider>
        </BrowserRouter>
        </Provider>,
        document.getElementById("root")
);

reportWebVitals();
