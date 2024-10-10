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
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { Link } from "@/i18n/routing";

export default function SignIn( ) {
  return (
    <>
      <Input type="text" label="Email or Username" required />
      <Input type="Password" label="Password" required />
    </>
  );
}
