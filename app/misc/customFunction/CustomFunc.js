"use client";
import { NotPops } from "@/app/util/ToastLoader";

export const ErrorFireSignUp = (e, PassFunc) => {
  if (e.code === "auth/email-already-in-use") {
    NotPops(
      "error",
      "This email is already registered. Try logging in to your account."
    );
    PassFunc();
  }
  if (e.code === "auth/invalid-email") {
    NotPops("error", "Invalid email format. Please enter a valid email.");
    PassFunc();
  }
  if (e.code === "auth/operation-not-allowed") {
    NotPops("error", "Sign up is currently disabled. Contact support.");
    PassFunc();
  }
  if (e.code === "auth/weak-password") {
    NotPops(
      "error",
      "Your password is too weak. Please choose a stronger password."
    );
    PassFunc();
  }
  if (e.code === "auth/user-disabled") {
    NotPops("error", "This account has been disabled. Contact support.");
    PassFunc();
  }
  if (e.code === "auth/user-not-found") {
    NotPops("error", "No user found with this email. Check and try again.");
    PassFunc();
  }
  if (e.code === "auth/wrong-password") {
    NotPops("error", "Incorrect password. Please try again.");
    PassFunc();
  }
  if (e.code === "auth/invalid-credential") {
    NotPops("error", "Invalid credential. Check and try again.");
    PassFunc();
  }
  if (e.code === "auth/network-request-failed") {
    NotPops(
      "error",
      "Network error. Please check your connection and try again."
    );
    PassFunc();
  }
  if (e.code === "auth/too-many-requests") {
    NotPops("error", "Too many attempts. Please wait and try again later.");
    PassFunc();
  }
  if (e.code === "auth/invalid-verification-code") {
    NotPops("error", "Invalid verification code. Please try again.");
    PassFunc();
  }
  if (e.code === "auth/requires-recent-login") {
    NotPops("error", "Please log in again to complete this action.");
    PassFunc();
  }
};

export const handleLoginError = (e, PassFunc) => {
  if (e.code === "auth/invalid-email") {
    NotPops("error", "No user with this email address exists");
    PassFunc();
  } else if (e.code === "auth/user-not-found") {
    NotPops("error", "User not found");
    PassFunc();
  } else if (e.code === "auth/invalid-password") {
    NotPops("error", "Password does not match your sign-up password");
    PassFunc();
  } else if (e.code === "auth/invalid-credential") {
    NotPops("error", "Invalid Credential, check and retry again");
    PassFunc();
  } else {
    NotPops("error", e.message);
    PassFunc();
  }
};

export const ResetError = (e, PassFunc) => {
  if (e.code === "auth/invalid-email") {
    NotPops("error", "No user with this email address exist");
    PassFunc();
  }
  if (e.code === "auth/user-not-found") {
    NotPops("error", "User not found");
    PassFunc();
  }
  if (e.code === "auth/invalid-password") {
    NotPops("error", "Password does not match your sign up password");
    PassFunc();
  }

  if (e.code === "auth/invalid-credential") {
    NotPops("error", "Invalid Credential, check and retry again");
    PassFunc();
  } else {
    NotPops("error", e.message);
    PassFunc();
  }
};
