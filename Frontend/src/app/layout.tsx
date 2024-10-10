import type { Metadata } from "next";
import "./globals.css";

import { Inter, Open_Sans } from "next/font/google";
import { getMessages } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import { NextUIProvider } from "./components/NextUiProvider";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/hoc/ReduxProvider";
import { QueryClient } from "@tanstack/react-query";
import QueryClientProvider from "@/hoc/QueryClientProvider";

const inter = Inter({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});

const openSans = Open_Sans({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={` min-h-screen relative overflow-x-hidden bg-gradient-to-br from-[#eaefff] to-[rgb(197,211,255)] dark:from-[#020e32] dark:to-[rgb(50,0,23)] dark:text-white   ${inter.className} `}
      >
        <ToastContainer  draggable />

        <Image
          layout="fill"
          style={{ zIndex: "-1", objectFit: "cover", objectPosition: "center" }}
          src={"/images/map.webp"}
          className="mix-blend-soft-light blur-[0.5px] dark:mix-blend-color-dodge "
          alt={"World Map Image"}
        />
        <NextIntlClientProvider messages={messages}>
          <NextUIProvider>
            <QueryClientProvider>
              <ReduxProvider>{children}</ReduxProvider>
            </QueryClientProvider>
          </NextUIProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
