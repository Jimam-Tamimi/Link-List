import React, { useEffect, useState } from "react";
import Navigation from "./Navigation";
import ThemeToggler from "./ThemeToggler";
import Button from "./utils/Button";
import Modal from "./utils/Modal";
import SignIn from "./Auth/SignIn";
import { MdOutlinePreview } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import SignUp from "./Auth/SignUp";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { Link } from "@/i18n/routing";
import Auth from "./Auth";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useMyProfile } from "../hooks/auth";
import SelectLanguage from "./SelectLanguage";
import getPageContent from "@/helpers/getPageContent";
import { useLocale } from "next-intl";
import EndHeaderPart from "./EndHeaderPart";

export default async function Header({
  previewHeader = false,
  pageContent,
}: {
  previewHeader?: boolean;
  pageContent: any;
}) {
  // const auth = useSelector((state: RootState) => state.auth?.data);
  // const [pageContent, setPageContent] = useState<any>({});
  // const locale = useLocale()
  // useEffect(() => {
  //   async function run() {
  //     setPageContent(await getPageContent("components/Header", locale));
  //   }
  //   run();

  //   return () => {};
  // }, []); 
  return (
    <>
      <header className="  px-4 py-4  z-10 relative  shadow-md dark:shadow-[#ffffff30]">
        <div className="lg:w-[90%] m-auto flex justify-between items-center">
          <Link href={"/"} className="text-3xl hidden md:block font-bold bg-gradient-to-br  from-[#02103d] to-[#1e00a3] dark:from-[#eaefff] dark:to-[#ffcfe4]   text-transparent bg-clip-text ">
            Link List
          </Link>
          {!previewHeader ? <Navigation pageContent={pageContent} /> : ""}

          <div className="flex  justify-center items-center lg:gap-10 gap-5">
            <ThemeToggler />
            <SelectLanguage />
            <EndHeaderPart previewHeader={previewHeader} pageContent={pageContent} />
          </div>
        </div>
      </header>
    </>
  );
}
