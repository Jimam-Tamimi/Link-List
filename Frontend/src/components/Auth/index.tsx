"use client";
import React, { useState } from "react";
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

export default function Auth() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [visibleComponent, setVisibleComponent] = useState<
    "SIGN_IN" | "SIGN_UP"
  >("SIGN_IN");

  const fadeAnimation = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  };

  return (
    <>
      <Button variant="transparent" onClick={onOpen}>
        Sign In
      </Button>

      <Modal
        size="lg"
        hideCloseButton
        backdrop="blur"
        classNames={{
          base: "dark:shadow-[0_0px_15px_#ffffff20] shadow-[0_0px_15px_#00000010] backdrop-blur-[15px] bg-[#caddff29] dark:bg-[rgba(255,255,255,0.1)] py-2",
        }}
        isOpen={isOpen}
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
                  className="  "
                >
                  <ModalHeader className="flex flex-row justify-between items-center">
                    <h3 className="text-2xl tracking-wide">
                      {visibleComponent === "SIGN_IN" ? "Sign In" : "Sign Up"}
                    </h3>
                    <div
                      onClick={onOpenChange.bind(false)}
                      className="p-0.5 left-0.5 relative hover:scale-110 active:scale-90 transition-all duration-300 ease-in-out cursor-pointer rounded-full"
                    >
                      <MdOutlineClose size={25} />
                    </div>
                  </ModalHeader>
                  <ModalBody className="gap-6">
                    <>
                      {visibleComponent === "SIGN_IN" ? <SignIn /> : <SignUp />}
                      <Button
                        className="w-full hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
                        size="sm"
                        onClick={onClose}
                      >
                        Submit
                      </Button>
                    </>
                  </ModalBody>
                  <ModalFooter className="flex flex-col gap-5 justify-center items-center">
                    <div className="flex justify-center items-center gap-14">
                      <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer">
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
                    <p className="tracking-wide font-semibold cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300">
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
                        className="tracking-wide font-semibold cursor-pointer text-blue-500 hover:text-blue-600 transition-all duration-300"
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
