import { useRouter } from "next/navigation";

export const saveSession = (userId, param1, param2) => {
  const sessionData = { param1, param2 };
  localStorage.setItem(`session_${userId}`, JSON.stringify(sessionData));
  console.log("Saved session data:", JSON.stringify(sessionData)); // Log the data being saved
};

export const getSession = (userId) => {
  const sessionData = localStorage.getItem(`session_${userId}`);
  console.log("Retrieved session data:", sessionData); // Log the data being retrieved
  return sessionData ? JSON.parse(sessionData) : null;
};

export const clearSession = (userId) => {
  localStorage.removeItem(`session_${userId}`);
  console.log("Cleared session for user:", userId); // Log the user ID
};

export const saveAffiliateId = (param1) => {
  const sessionData = { param1 };
  localStorage.setItem(`affiliateUsername`, JSON.stringify(sessionData));
  //console.log("Saved session data:", JSON.stringify(sessionData)); // Log the data being saved
};

export const getAffiliateId = () => {
  const sessionData = localStorage.getItem(`affiliateUsername`);
  return sessionData ? JSON.parse(sessionData) : null;
};
// Transaction Potter.. Deleter
export const savePayId = (userId, TxId, nowId, Amount) => {
  const sessionData = { TxId, nowId, Amount };
  localStorage.setItem(`Payment_${userId}`, JSON.stringify(sessionData));
  console.log("Saved session data:", JSON.stringify(sessionData)); // Log the data being saved
};

export const getPayId = (userId) => {
  const sessionData = localStorage.getItem(`Payment_${userId}`);
  return sessionData ? JSON.parse(sessionData) : null;
};

export const clearPayId = (userId) => {
  localStorage.removeItem(`Payment_${userId}`);
  console.log("Cleared session for user:", userId); // Log the user ID
};
