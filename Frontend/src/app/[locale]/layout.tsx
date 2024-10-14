import { ThemeProvider } from "next-themes";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "@/components/Navigation";
import { getPathname } from "@/i18n/routing";
import {
  getLocale,
  getMessages,
  unstable_setRequestLocale,
} from "next-intl/server";
import "../globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/hoc/ReduxProvider";
import { QueryClient } from "@tanstack/react-query";
import QueryClientProvider from "@/hoc/QueryClientProvider";
import NProgress, { settings } from "nprogress";
import "nprogress/nprogress.css";
import { NextUIProvider } from "../components/NextUiProvider";
import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";

const inter = Inter({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});
const openSans = Open_Sans({
  subsets: ["latin"], // Add other subsets if needed
  weight: ["400", "500", "600", "700"], // Specify the weights you need
});

export const metadata: Metadata = {
  title: "Link List",
  description: "Link List",
};

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={` min-h-screen relative overflow-x-hidden bg-gradient-to-br from-[#eaefff] to-[rgb(197,211,255)] dark:from-[#020e32] dark:to-[rgb(50,0,23)] dark:text-white   ${openSans.className} ${inter.className}   `}
      >
        <ReduxProvider>
          <NextIntlClientProvider messages={messages}>
            <ToastContainer draggable />

            <ThemeProvider defaultTheme="system" enableSystem attribute="class">
              <NextUIProvider>
                <QueryClientProvider>
                  <div className="absolute  left-[212px] top-[212px] shadow-[0px_0px_300px_135px_#2563eb] bg-transparent z-0"></div>
                  <div className="absolute   right-[0] bottom-[0] shadow-[0px_143px_12810px_297px_#eb25a67d] bg-transparent z-0"></div>
                  <Image
                    layout="fill"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    src={"/images/map.webp"}
                    className="mix-blend-soft-light blur-[0.5px] dark:mix-blend-color-dodge "
                    alt={"World Map Image"}
                  />
                  {children}
                </QueryClientProvider>
              </NextUIProvider>
            </ThemeProvider>
          </NextIntlClientProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}

import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
