"use client";
import "@radix-ui/themes/styles.css";
import "../globals.css";
import { Theme } from "@radix-ui/themes";
import { cinzel, lato, raleway } from "../fonts/font";
import { TopBar } from "../components/TopFooter/TopBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/TopFooter/Footer";
import { Suspense, useEffect, useState } from "react";
import Loader from "../util/Loader";
import { CartProvider } from "../components/Dashboard/Comps/CartContext/Cart";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200); // optional delay
    return () => clearTimeout(timeout);
  }, []);
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${cinzel.variable} font-raleway antialiased`}
      >
        {loading && <Loader />}
        {!loading && (
          <>
            <TopBar />
            {children}
            <Footer />
          </>
        )}
        <ToastContainer className="custom-toast" />
      </body>
    </html>
  );
}
