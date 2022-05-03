import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";

import theme from "../theme";
import { AppProps } from "next/app";
import { wrapper } from "../app/store";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
        <title>Planning Poker</title>
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default wrapper.withRedux(MyApp);
