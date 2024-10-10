import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import { FaGripLines, FaLink, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteSweep, MdOutlineLibraryAddCheck } from "react-icons/md";
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
import { FaGithub } from "react-icons/fa6";

const socialMediaOptions = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <FaFacebook />,
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: <FaTwitter />,
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin />,
  },
  {
    value: "github",
    label: "GitHub",
    icon: <FaGithub  />,
  },
  {
    value: "snapchat",
    label: "Snapchat",
    icon: <FaSnapchat />,
  },
  { value: "reddit", label: "Reddit", icon: <FaReddit /> },
  {
    value: "pinterest",
    label: "Pinterest",
    icon: <FaPinterest />,
  },
  { value: "tiktok", label: "TikTok", icon: <FaTiktok /> },
  { value: "other", label: "Other", icon: <FaLink /> },
];

export default async function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;

  const response = await axios.get(
    `http://127.0.0.1:8000/static/content/${locale}/home.json`
  );
  const content = response.data;

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold ">Customize your links</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Add/edit/remove links below and then share all your profiles with the
          world!
        </p>
      </div>

      {/* Add New Link */}
      <div className="flex justify-center items-center p-2 rounded-full m-auto    bg-gradient-to-br from-[#2563eb] to-[#0035a8] opacity-90 active:scale-90 hover:opacity-100 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out">
        <FaPlus color="white" size={20} />
      </div>

      <div
        className="flex flex-col items-stretch justify-center gap-2 p-4 pt-3
  // border-gray-800 rounded dark:border-gray-200
  dark:shadow-[0_0px_2px_#ffffff50]
  shadow-[0_0px_2px_#00000050]
  "
      >
        <div className="flex items-center justify-between ">
          <LiaGripLinesSolid
            size={30}
            className="cursor-pointer transition-all duration-300 ease-in-out hover:scale-105 active:scale-95"
          />

          <MdOutlineDeleteSweep
            size={25}
            className="text-red-500 transition-all duration-300 ease-in-out cursor-pointer hover:text-red-600 hover:scale-105 active:scale-95"
          />
          <MdOutlineLibraryAddCheck
            size={25}
            className="text-green-500 transition-all duration-300 ease-in-out cursor-pointer hover:green-red-600 hover:scale-105 active:scale-95"
          />
        </div>
        <div className="flex flex-col items-start gap-5 lg:justify-between lg:flex-row">
          <Select
            iconLabel={<IoShareSocialSharp size={18} />}
            label={"Platform 1"}
            options={socialMediaOptions}
          />
          <Input
            id="link-1"
            type="url"
            placeholder="Enter your link"
            label="Link 1"
            leftIcon={<FaLink />}
          />
        </div>
        {/* <Button size="sm" className="self-end" >Save</Button> */}
      </div>
    </>
  );
}
