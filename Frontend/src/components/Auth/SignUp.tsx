"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import Button from "../utils/Button";
import Input from "../utils/Input";
import { MdAlternateEmail, MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";

export default function SignUp() {
  return (
    <>
      <Input
        leftIcon={<MdAlternateEmail />}
        type="text"
        label="Username"
        required
      />
      <Input leftIcon={<HiOutlineMail />} type="text" label="Email" required />
      <Input
        leftIcon={<RiLockPasswordLine />}
        type="Password"
        label="Password"
        required
      />
      <Input
        leftIcon={<RiLockPasswordLine />}
        type="Password"
        label="Confirm Password"
        required
      />

    </>
  );
}
