"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getPayId, clearPayId } from "./Session";
import { ref, update } from "firebase/database";
import { DB } from "../Firebase/AuthHolder";
import { NotPops } from "../util/ToastLoader";

export const VerifyTnx = ({ userId }) => {
  const router = useRouter();

  useEffect(() => {
    const PayId = getPayId(userId);

    if (!PayId || !PayId.TxId) return;

    const interval = setInterval(async () => {
      const Data = { orderId: PayId.TxId };

      try {
        const res = await fetch(`/api/TxList`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(Data),
        });

        const data = await res.json();

        console.log("Receiving Data", data);

        if (!data || !data.payment_status) return;

        if (data.payment_status === "finished") {
          const DbUrl = `users/${userId}`;

          if (parseInt(PayId.Amount) < 60) {
            await update(ref(DB, DbUrl), { AffiliateStatus: true });
            router.push("/affiliate");
            clearPayId(userId);
            NotPops("success", "Affiliate Payment Successful");
          } else {
            await update(ref(DB, DbUrl), { PlanStatus: true });
            router.push("/home");
            clearPayId(userId);
            NotPops("success", "Student Plan Payment Successful");
          }

          clearInterval(interval); // ✅ Stop polling once successful
        }
      } catch (err) {
        console.error("Error checking transaction:", err);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [userId, router]);

  return null;
};
