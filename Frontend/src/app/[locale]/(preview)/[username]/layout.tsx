import { ThemeProvider } from "next-themes";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "@/components/Navigation";
import { getPathname } from "@/i18n/routing";
import { getLocale, unstable_setRequestLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Image from "next/image";

export default async function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <>
        <Header previewHeader />
        {children}
    </>
  );
}
