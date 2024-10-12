'use client'
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
import { useSelector } from 'react-redux';
import { RootState } from "@/redux/store";
import { useMyProfile } from '../hooks/auth';

export default function Header({
  previewHeader = false,
}: {
  previewHeader?: boolean;
}) {


  const myProfile = useMyProfile();

  
  
  return (
    <>
      <header className="  p-4   shadow-md dark:shadow-[#ffffff30]">
        <div className="w-[90%] m-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-br  from-[#02103d] to-[#1e00a3] dark:from-[#eaefff] dark:to-[#ffcfe4]   text-transparent bg-clip-text ">
            Link List
          </h1>
          {!previewHeader ? <Navigation /> : ""}

          <div className="flex  justify-center items-center gap-10">
            <ThemeToggler />
            {previewHeader ? (
              <Link href={"/links"}>
                <Button size="md" rightIcon={<FiEdit  size={24} />}>
                  Create Your Own Profile
                </Button>
              </Link>
            ) : (
              <>
              <Link target="_blank" href={`/${myProfile?.data?.username}`}>
                <Button size="md" rightIcon={<FiExternalLink size={24} />}>
                  Preview
                </Button>
              </Link>
                <Auth />
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
