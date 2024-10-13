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
import 'react-loading-skeleton/dist/skeleton.css'
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
import { SkeletonTheme } from "react-loading-skeleton";

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

export default async function Layout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  return (
    
    <ReduxProvider>

        <NextIntlClientProvider messages={messages}>
          <ToastContainer draggable />
            <Image
              layout="fill"
              style={{
                zIndex: "-1",
                objectFit: "cover",
                objectPosition: "center",
              }}
              src={"/images/map.webp"}
              className="mix-blend-soft-light blur-[0.5px] dark:mix-blend-color-dodge "
              alt={"World Map Image"}
            />
            <ThemeProvider defaultTheme="system" enableSystem attribute="class">
              <NextUIProvider>
                <QueryClientProvider>
                  <div className="absolute  left-[212px] top-[212px] shadow-[0px_0px_300px_135px_#2563eb] bg-transparent z-0"></div>
                  <div className="absolute   right-[0] bottom-[0] shadow-[0px_143px_12810px_297px_#eb25a67d] bg-transparent z-0"></div>

                  {children}
                </QueryClientProvider>
              </NextUIProvider>
            </ThemeProvider>
        </NextIntlClientProvider>
    </ReduxProvider>

  );
}
