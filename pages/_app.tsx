import * as React from "react";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material";
import { theme } from "styles/credinityTheme";
import Head from "next/head";
import { store } from "@/store/store";
import { Provider } from "react-redux";

function CredinityApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default CredinityApp;
