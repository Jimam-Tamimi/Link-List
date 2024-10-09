import React from "react";
import Navigation from "./Navigation";
import ThemeToggler from "./ThemeToggler";
import Button from "./utils/Button";
import Modal from "./utils/Modal";
import SignIn from "./SignIn";
import { MdOutlinePreview } from "react-icons/md";
import { CiViewList } from "react-icons/ci";
import SignUp from "./SignUp";
import { FiExternalLink } from "react-icons/fi";

export default function Header() {
  return (
    <>
      <header className="  p-4   shadow-md dark:shadow-[#ffffff30]">
        <div className="w-[90%] m-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-br  from-[#02103d] to-[#1e00a3] dark:from-[#eaefff] dark:to-[#ffcfe4]   text-transparent bg-clip-text ">
            Link List
          </h1>
          <Navigation />
          <div className="flex  justify-center items-center gap-10">
            <ThemeToggler />
            <Button size="md" 
            rightIcon={<FiExternalLink               size={24}  />}
            >Preview</Button>
            <SignUp />
          </div>
        </div>
      </header>
    </>
  );
}
