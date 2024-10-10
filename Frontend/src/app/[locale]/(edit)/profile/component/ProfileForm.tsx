"use client"
import ProfilePictureUploader from '@/components/ProfilePictureUploader'
import React from 'react'
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import { FaGripLines, FaLink, FaPlus } from "react-icons/fa";
import { MdAlternateEmail, MdOutlineBadge, MdOutlineDeleteSweep, MdOutlineLibraryAddCheck } from "react-icons/md";
import { LiaGripLinesSolid } from "react-icons/lia";
import Select from "@/components/utils/Select";
import {
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaLinkedin,
  FaSnapchat,
  FaReddit,
  FaPinterest,
  FaTiktok,
} from "react-icons/fa";
import { IoMdCheckboxOutline } from "react-icons/io";
import Input from "@/components/utils/Input";
import { BsYoutube } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { LuFileText } from "react-icons/lu";

 
export default function ProfileForm() {
  return (
    <>

<form className="flex flex-col justify-center items-stretch gap-8">
        <div className="flex justify-between items-center gap-8 md:flex-row flex-col">
          <Input
            leftIcon={<MdOutlineBadge />}
            type="text"
            label="First Name"
            required
          />
          <Input
            leftIcon={<MdOutlineBadge />}
            type="text"
            label="Last Name"
            required
          />
        </div>
          <Input
            leftIcon={<LuFileText  />}
            type="text"
            label="Bio  "
            required
          />
          <Input
            leftIcon={<MdAlternateEmail />}
            type="text"
            label="Username"
            required
          />
          <Input
            leftIcon={<HiOutlineMail />}
            type="email"
            label="Email"
            required
          />
          <ProfilePictureUploader onUpload={e => console.log(e.values())} />
 
        <Button
          className="md:self-end self-stretch hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
          size="sm"
        >
          Submit
        </Button>
      </form>
    
    </>
  )
}
