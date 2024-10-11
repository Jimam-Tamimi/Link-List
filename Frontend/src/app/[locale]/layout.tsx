import { ThemeProvider } from "next-themes";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import Link from "@/components/Navigation";
import { getPathname } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
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
        <div className="absolute  left-[212px] top-[212px] shadow-[0px_0px_300px_135px_#2563eb] bg-transparent z-0"></div>
        <div className="absolute   right-[0] bottom-[0] shadow-[0px_143px_12810px_297px_#eb25a67d] bg-transparent z-0"></div>
        {children}
    </>
  );
}
