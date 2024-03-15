import "@/styles/globals.css";
import Head from "next/head";
import Layout from "../components/Layout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import "bootstrap/dist/css/bootstrap.css";
import { UserProvider } from "../context/UserState";

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
      <UserProvider>
        <Layout>
          <Head>
            <meta
              name="viewport"
              content="width=device-width, initial-scale=1"
            />
            <title>Animals Inventorys</title>
          </Head>
          <Component {...pageProps} />
        </Layout>
      </UserProvider>
    </QueryClientProvider>
  );
}
