import React from "react";
import { Provider } from "react-redux";
import type { AppProps } from "next/app";
import ErrorBoundary from "@/src/components/ErrorBoundary/ErrorBoundary";
import store from "@/src/store/store";

import "@/src/styles/globals.css";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}
