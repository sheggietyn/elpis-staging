"use client";
import "@radix-ui/themes/styles.css";
import "../globals.css";
import { cinzel, raleway } from "../fonts/font";
import { TopBar } from "../components/TopFooter/TopBar";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/TopFooter/Footer";
import { Suspense, useEffect, useState } from "react";
import Loader from "../util/Loader";
import { Dashboard } from "../components/Dashboard/Comps/CompDash";
import { AuthProvider } from "../auth/AuthProvider";

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
        <Theme className={`${raleway.variable} font-raleway antialiased`}>
          {loading && <Loader />}
          {!loading && (
            <>
              {children}
              <ToastContainer className="custom-toast" />
            </>
          )}
        </Theme>
      </body>
    </html>
  );
}
