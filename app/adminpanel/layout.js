"use client";
import "../globals.css";
import "@radix-ui/themes/styles.css";
import { cinzel, raleway } from "../fonts/font";
import { TopBar } from "../components/TopFooter/TopBar";
import "react-toastify/dist/ReactToastify.css";
import { Theme } from "@radix-ui/themes";
import { ToastContainer } from "react-toastify";
import React, { Suspense, useEffect, useState } from "react";
import Loader from "../util/Loader";
import { Dashboard } from "../components/Dashboard/Comps/CompDash";
import { AuthProvider } from "../auth/AuthProvider";
import { DashboardAdmin } from "../components/AdminDash/AdminComp/CompDash";
import { AuthAdminProvider } from "../auth/AuthAdminProvider";
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

        <AuthProvider>
          <Theme
            accentColor="none"
            className={`${raleway.variable} font-raleway antialiased`}
          >
            {!loading && (
              <DashboardAdmin>
                {children}
                <ToastContainer className="custom-toast" />
              </DashboardAdmin>
            )}
          </Theme>
        </AuthProvider>
      </body>
    </html>
  );
}
