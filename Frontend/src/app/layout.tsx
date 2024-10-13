import { ThemeProvider } from "next-themes";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "@/components/Navigation";
import { getPathname } from "@/i18n/routing";
import { getLocale, getMessages } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import { NextIntlClientProvider } from "next-intl";
import Image from "next/image";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import ReduxProvider from "@/hoc/ReduxProvider";
import { QueryClient } from "@tanstack/react-query";
import QueryClientProvider from "@/hoc/QueryClientProvider";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import type { Metadata } from "next";



export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  return (
    <html lang="en">
      <body
        className={` min-h-screen relative overflow-x-hidden bg-gradient-to-br from-[#eaefff] to-[rgb(197,211,255)] dark:from-[#020e32] dark:to-[rgb(50,0,23)] dark:text-white    `}
      >

        {children}
    
    </body>
    </html>
  );
}
