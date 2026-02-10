import localFont from "next/font/local";

export const raleway = localFont({
  src: [
    {
      path: "./Raleway-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Raleway-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Raleway-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Raleway-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-raleway",
  display: "swap",
});
export const cinzel = localFont({
  src: [
    {
      path: "./Cinzel-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./Cinzel-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./Cinzel-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./Cinzel-Bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./Cinzel-ExtraBold.ttf",
      weight: "800",
      style: "normal",
    },
    {
      path: "./Cinzel-Black.ttf",
      weight: "900",
      style: "normal",
    },
  ],
  variable: "--font-cinzel",
  display: "swap",
});
