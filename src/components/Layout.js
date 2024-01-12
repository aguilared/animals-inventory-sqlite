import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Toaster } from "react-hot-toast";
export default function Layout({ children }) {
  return (
    <>
      <Header />
      <main>
        {children}
        <Toaster />
      </main>
      <Footer />
    </>
  );
}
