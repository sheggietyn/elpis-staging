"use client";
import Image from "next/image";
import Head from "next/head";
import { useRouter } from "next/navigation";
import BeeGee from "@/app/assets/images/emptystate.png";
import { SlotBtn } from "../Buttons/BtnLarge";
import Link from "next/link";

export const NotFoundComp = () => {
  const router = useRouter();
  return (
    <div className="HoldScreen items-center justify-center flex">
      <Head>
        <title>Page Not Found - Elpis Academy</title>
      </Head>
      <div className="min-h-screen min-w-screen flex flex-col items-center justify-center p-4">
        <Image
          src={BeeGee}
          alt="404 Not Found"
          width={300}
          height={300}
          className="mb-4 w-44 h-44 md:w-60 md:h-60"
        />
        <h1 className="md:text-3xl text-xl text-secondary font-bold mb-2">
          Page Not Found
        </h1>
        <p className="text-center text-gray-500 mb-4">
          Hey Trader, I think you hit the wrong page, this page does not exist.
        </p>
        <Link href="/">
          <SlotBtn
            onClick={() => router.replace("/")}
            btnText={"Go to Homepage"}
            more="transition-all duration-300 ease-in-out"
          />
        </Link>
      </div>
    </div>
  );
};
