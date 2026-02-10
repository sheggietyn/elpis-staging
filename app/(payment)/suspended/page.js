"use client";
import { DB, auth } from "@/app/Firebase/AuthHolder";
import { clearSession } from "@/app/Libs/Session";
import { AuthContext } from "@/app/auth/AuthProvider";
import { GrayBtn, SlotBtn } from "@/app/components/Buttons/BtnLarge";
import { NotPops } from "@/app/util/ToastLoader";
import { child, ref, remove } from "firebase/database";
import Link from "next/link";
import React, { useContext } from "react";

export default function page() {
  const user = useContext(AuthContext);
  const SessionDel = child(ref(DB), `Session/${user.uid}`);

  const Signerr = () => {
    window.location.href = "/login"; // Fallback for client-side redirect
  };

  const SignOut = async () => {
    try {
      // Perform session cleanup
      await Promise.all([
        remove(SessionDel), // Assuming this is an async function to remove session data
        clearSession(user.uid), // Assuming this is an async function to clear session
      ]);

      // Sign out from Firebase
      await auth.signOut();

      // Show success notification
      NotPops("success", "Logout Success");

      // Perform redirect after all operations are complete
      Signerr();
    } catch (error) {
      console.error("Error during sign-out:", error.message);
      NotPops("error", "Logout Failed");
    }
  };

  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white rounded-2xl p-10 max-w-lg text-center">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-full bg-[#D4AF3F] flex items-center justify-center text-white font-bold text-2xl">
            E
          </div>
        </div>

        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Website Suspended
        </h1>
        <p className="text-gray-600 text-sm mb-6">
          Your Elpis account has been supended,for violating our rules . <br />
          Please check back later or contact support for assistance.
        </p>

        <div className="flex items-center justify-between mt-5 gap-x-5">
          <GrayBtn btnText={"Log Out"} onClick={() => SignOut()} />
          <Link href="mailto:support@digitalmogulacademy.com">
            <SlotBtn btnText={"Contact Support"} />
          </Link>
        </div>
      </div>
    </div>
  );
}
