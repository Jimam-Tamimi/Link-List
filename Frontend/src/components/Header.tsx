"use client";
import React from "react";
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

export default function Header({
  previewHeader = false,
}: {
  previewHeader?: boolean;
}) {

  return (
    <>
      <header className="  px-4 py-4    shadow-md dark:shadow-[#ffffff30]">
        <div className="lg:w-[90%] m-auto flex justify-between items-center">
          <h1 className="text-3xl hidden md:block font-bold bg-gradient-to-br  from-[#02103d] to-[#1e00a3] dark:from-[#eaefff] dark:to-[#ffcfe4]   text-transparent bg-clip-text ">
            Link List
          </h1>
          {!previewHeader ? <Navigation /> : ""}

          <div className="flex  justify-center items-center lg:gap-10 gap-5">
            <ThemeToggler />
            <SelectLanguage />
            {previewHeader ? (
              <Link href={"/links"}>
                <Button rightIcon={<FiEdit size={24} />}>
                  Create Your Own Profile
                </Button>
              </Link>
            ) : (
              <>
                <NotForPreview />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}

function NotForPreview() {
  const myProfile = useMyProfile();

  return (
    <>
      <Link target="_blank" href={`/${myProfile?.data?.username}`}>
        <Button
          className="lg:text-base lg:py-3 lg:px-6 md:block hidden"
          size="sm"
          rightIcon={<FiExternalLink size={24} />}
        >
          Preview
        </Button>
      </Link>
      <Auth />
    </>
  );
}
