import "@/styles/globals.css";
import Head from "next/head";
import Header from "../components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,
      retry: true,
      staleTime: 10000,
    },
  },
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>Animals Inventory</title>
        </Head>
        <Header />
        <main className="w-full flex-1 flex-col items-center justify-center  text-center">
          <Component {...pageProps} />
        </main>
      </>
    </QueryClientProvider>
  );
}
