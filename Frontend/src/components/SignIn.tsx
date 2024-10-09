"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Button from "./utils/Button";
import Input from "./utils/Input";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function App() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          base: " dark:shadow-[0_0px_15px_#ffffff20]    shadow-[0_0px_15px_#00000010]  backdrop-blur-[15px]   bg-[#caddff29] dark:bg-[rgba(255,255,255,0.1)]  py-2",
        }}
        isOpen={true}
        onOpenChange={onOpenChange}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-row justify-between items-center ">
                <h3 className="text-2xl tracking-wide">Sign In</h3>
                <div
                  onClick={onOpenChange.bind(false)}
                  className="p-0.5 left-0.5 relative hover:scale-110 active:scale-90 transition-all duration-300  ease-in-out cursor-pointer   rounded-full"
                >
                  <MdOutlineClose size={25} />
                </div>
              </ModalHeader>
              <ModalBody className="flex flex-col gap-6 justify-center items-center">
                <Input type="text" label="Email or Username" required />
                <Input type="Password" label="Password" required />
                <Button
                  className="w-full hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
                  size="sm"
                  onClick={onClose}
                >
                  Submit
                </Button>
              </ModalBody>
              <ModalFooter className="flex flex-col  gap-5 justify-center items-center">
                <div className="flex justify-center items-center gap-14">
                  <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer ">
                    <Image
                      alt="google logo"
                      src={"/images/logo/Google Logo.svg"}
                      width={300}
                      height={300}
                      className="w-6 "
                    />
                  </div>
                  <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer ">
                    <Image
                      alt="google logo"
                      src={"/images/logo/facebook-logo.png"}
                      width={300}
                      height={300}
                      className="w-6 "
                    />
                  </div>
                  <div className="p-2 rounded-md bg-[#32010144] hover:scale-105 active:scale-95 transition-all duration-300 ease-in-out cursor-pointer ">
                    <Image
                      alt="google logo"
                      src={"/images/logo/apple logo.svg"}
                      width={300}
                      height={300}
                      className="w-6 "
                    />
                  </div>
                </div>
                <p className=" tracking-wide font-semibold cursor-pointer text-blue-500 hover:text-blue-600   transition-all duration-300">
                  Forgot Password
                </p>
                <p>
                  Don't Have an Account?
                  <span className=" tracking-wide font-semibold cursor-pointer text-blue-500 hover:text-blue-600   transition-all duration-300">
                    {"  "}
                    Create One
                  </span>
                </p>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
