import React from "react";
import * as ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import reportWebVitals from "./reportWebVitals";
import { legacy_createStore as createStore } from "redux";
import { allreducer } from "../src/redux/reducer";
import { Provider } from "react-redux";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();

export const store = createStore(allreducer);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <App />
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
