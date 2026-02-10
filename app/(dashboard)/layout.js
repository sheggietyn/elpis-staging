"use client";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { cinzel, raleway } from "../fonts/font";
import { TopBar } from "../components/TopFooter/TopBar";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import { Footer } from "../components/TopFooter/Footer";
import React, { Suspense, useEffect, useState, useContext } from "react";
import Loader from "../util/Loader";
import { Dashboard } from "../components/Dashboard/Comps/CompDash";
import { AuthContext, AuthProvider } from "../auth/AuthProvider";
import { ConnectData } from "../connector/CloggerFunc";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { CartProvider } from "../components/Dashboard/Comps/CartContext/Cart";

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 1200); // optional delay
    return () => clearTimeout(timeout);
  }, []);

  //const PlanStatus = userData ? userData.PlanStatus || false : false;
  return (
    <html lang="en">
      <body
        className={`${raleway.variable} ${cinzel.variable} font-raleway antialiased`}
      >
        {loading && <Loader />}

        <AuthProvider>
          <Theme
            accentColor="none"
            className={`${raleway.variable} font-raleway antialiased`}
          >
            {!loading && (
              <Dashboard>
                {children}

                <ToastContainer className="custom-toast" />
              </Dashboard>
            )}
          </Theme>
        </AuthProvider>
        <Script
          src="https://korablobstorage.blob.core.windows.net/modal-bucket/korapay-collections.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
