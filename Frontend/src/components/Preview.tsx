import { getLinksByUsername, LinkType } from "@/api-calls/linkSharing";
import { useMyProfile, useProfileByUsername } from "@/hooks/auth";
import { useLinksByUsername } from "@/hooks/linkSharing";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { FaArrowRight, FaLink } from "react-icons/fa";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";
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
import { ProfileType } from "@/api-calls/auth";


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
    icon: <FaGithub />,
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


export default async function Preview({
  className,
  username,
}: {
  className?: string;
  username: string;
}) {


  // console.log(username)
  // const { data: links, isPending } = useLinksByUsername(username);
  // const {data: profile,} = useProfileByUsername(username);
  const response = await await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/links/get-links-for-username/`, { username });
  const links : LinkType[] = response.data;

  const profileResponse = await await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profiles/get-profile-by-username/`, { username });
  const profile : ProfileType = profileResponse.data;

  return (
    <>
      <section
        className={` ${className} flex justify-center items-center z-50 `}
      >
        <div className="container flex flex-col justify-center gap-4  z-50 items-center py-10">
          <Image
            alt="photo frame"
            src={profile?.profile_image as any}
            width={800}
            height={800}
            className="object-cover object-center rounded-full w-28 h-28"
          />
          <div className=" font-semibold justify-center flex-col items-center gap-3 tracking-wider flex">
            <h1 className="text-[1.8rem] opacity-80">@{profile?.username}</h1>
            <h1 className="text-[1.9rem] capitalize">{profile?.first_name} {profile?.last_name}</h1>
          </div>
          <p className="text-center mb-5 leading-loose max-w-[900px] capitalize">
            {profile?.bio}
          </p>

          {links?.map((link, i) => (
            <Link href={link?.url as any} target="_blank"  className="bg-black text-white font-semibold tracking-wide cursor-pointer flex justify-between items-center p-6 hover:scale-[1.04] rounded-lg sm:w-[80%] w-[96%] max-w-[900px] active:scale-100 transition-all duration-300 ease-in-out">
              <div className="flex text-lg gap-3 justify-center items-center">
                {/* <FaGithub size={27} /> */}
                {React.cloneElement(
                  (
                    socialMediaOptions.find(
                      (option) => option.value === link?.platform
                    ) || {
                      label: link?.platform,
                      value: link?.platform,
                      icon: <FaLink />,
                    }
                  )?.icon,
                  {
                    size: 27, // Get icon size
                  } as any
                )}
                <p>
                  {link?.platform
                    .split(" ")
                    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                    .join(" ")}
                </p>{" "}
              </div>
              <FaArrowRightLong size={22} />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
