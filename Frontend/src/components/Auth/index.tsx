"use client";
import React, { useEffect, useState } from "react";
import Button from "../utils/Button";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/modal";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "@/redux/store";
import { signOut } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";
import { signIn } from 'next-auth/react';

export default function Auth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visibleComponent, setVisibleComponent] = useState<
    "SIGN_IN" | "SIGN_UP"
  >("SIGN_IN");
  const auth = useSelector(
    (state: RootState) => state.auth?.data
  );

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };
 
 
  const dispatch = useAppDispatch();

  useEffect(() => {
    
    if(auth?.access){
      console.log("first")
      onOpenChange()
    }
    return () => {
      
    }
  }, [auth?.access])
  
  
  return (
    <>
      {!auth?.access ? (
        <Button className="lg:text-base lg:py-3 lg:px-6" size="sm"  variant="transparent" onClick={onOpen}>
          Sign In
        </Button>
      ) : 
        <Button className="lg:text-base lg:py-3 lg:px-6" size="sm"  variant="transparent" onClick={() => {dispatch(signOut()); toast.success("Successfully Signed Out")}}>
          Sign Out
        </Button>
    }

      <Modal
        size="lg"
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "dark:shadow-[0_0px_15px_#ffffff20] shadow-[0_0px_15px_#00000010] backdrop-blur-[15px] bg-[#caddff29] dark:bg-[rgba(255,255,255,0.1)] py-2",
        }}
        isOpen={isOpen && !auth?.access}
        onOpenChange={onOpenChange}
      >
        <ModalContent className="overflow-hidden">
          {(onClose) => (
            <>
              <AnimatePresence mode="popLayout" initial={true}>
                <motion.div
                  key={visibleComponent} // Add key here to trigger reanimation
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.25 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  className=""
                >
                  <ModalHeader className="flex flex-row items-center justify-between">
                    <h3 className="text-2xl tracking-wide">
                      {visibleComponent === "SIGN_IN" ? "Sign In" : "Sign Up"}
                    </h3>
                    <div
                      onClick={onOpenChange}
                      className="p-0.5 left-0.5 relative hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out cursor-pointer rounded-full"
                    >
                      <MdOutlineClose size={25} />
                    </div>
                  </ModalHeader>
                  <ModalBody className="gap-6">
                    <>
                      {visibleComponent === "SIGN_IN" ? <SignIn /> : <SignUp />}
                    </>
                  </ModalBody>
                  <ModalFooter className="flex flex-col items-center justify-center gap-5">
                    <div className="flex items-center justify-center gap-14">
                      <div onClick={() => signIn('google')} className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                        <Image
                          alt="Google logo"
                          src={"/images/logo/Google Logo.svg"}
                          width={300}
                          height={300}
                          className="w-6"
                        />
                      </div>
                      <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                        <Image
                          alt="Facebook logo"
                          src={"/images/logo/facebook-logo.png"}
                          width={300}
                          height={300}
                          className="w-6"
                        />
                      </div>
                      <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
                        <Image
                          alt="Apple logo"
                          src={"/images/logo/apple logo.svg"}
                          width={300}
                          height={300}
                          className="w-6"
                        />
                      </div>
                    </div>
                    <p className="font-semibold tracking-wide text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600">
                      Forgot Password
                    </p>
                    <p>
                      Don't Have an Account?
                      <span
                        onClick={() => {
                          visibleComponent === "SIGN_IN"
                            ? setVisibleComponent("SIGN_UP")
                            : setVisibleComponent("SIGN_IN");
                        }}
                        className="font-semibold tracking-wide text-blue-500 transition-all duration-300 cursor-pointer hover:text-blue-600"
                      >
                        {"  "}Create One
                      </span>
                    </p>
                  </ModalFooter>
                </motion.div>
              </AnimatePresence>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
