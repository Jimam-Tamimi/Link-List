import { getLinksByUsername, LinkType } from "@/api-calls/linkSharing";
import { useMyProfile, useProfileByUsername } from "@/hooks/auth";
import { useLinksByUsername } from "@/hooks/linkSharing";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import React from "react";
import { FaArrowRight,   } from "react-icons/fa";
import { FaArrowRightLong,   } from "react-icons/fa6";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin, FaGoogle, FaGithub, FaSnapchat, FaReddit, FaPinterest, FaTiktok, FaTwitch, FaDiscord, FaApple, FaAmazon, FaMicrosoft, FaSkype, FaQuora, FaSoundcloud, FaDribbble, FaMedium, FaVimeo, FaTelegram, FaLink } from "react-icons/fa";

import { ProfileType } from "@/api-calls/auth";


export const socialMediaOptions = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <FaFacebook />,
    bg_color: "#1877f2",
    text_color: "#ffffff",
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: <FaTwitter />,
    bg_color: "#1da1f2",
    text_color: "#ffffff",
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    bg_color: "#c32aa3",
    text_color: "#ffffff",
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    bg_color: "#25d366",
    text_color: "#ffffff",
  },
  {
    value: "youtube",
    label: "Youtube",
    icon: <FaYoutube />,
    bg_color: "#ff0000",
    text_color: "#ffffff",
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin />,
    bg_color: "#0a66c2",
    text_color: "#ffffff",
  },
  {
    value: "google",
    label: "Google",
    icon: <FaGoogle />,
    bg_color: "#db4437",
    text_color: "#ffffff",
  },
  {
    value: "github",
    label: "GitHub",
    icon: <FaGithub />,
    bg_color: "black",
    text_color: "#ffffff",
  },
  {
    value: "snapchat",
    label: "Snapchat",
    icon: <FaSnapchat />,
    bg_color: "#fffc00",
    text_color: "#333333",
  },
  {
    value: "reddit",
    label: "Reddit",
    icon: <FaReddit />,
    bg_color: "#ff5700",
    text_color: "#ffffff",
  },
  {
    value: "pinterest",
    label: "Pinterest",
    icon: <FaPinterest />,
    bg_color: "#bd081c",
    text_color: "#ffffff",
  },
  {
    value: "tiktok",
    label: "TikTok",
    icon: <FaTiktok />,
    bg_color: "#ee1d52",
    text_color: "#ffffff",
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: <FaTwitch />,
    bg_color: "#9146ff",
    text_color: "#ffffff",
  },
  {
    value: "discord",
    label: "Discord",
    icon: <FaDiscord />,
    bg_color: "#5865f2",
    text_color: "#ffffff",
  },
  {
    value: "apple",
    label: "Apple",
    icon: <FaApple />,
    bg_color: "#000000",
    text_color: "#ffffff",
  },
  {
    value: "amazon",
    label: "Amazon",
    icon: <FaAmazon />,
    bg_color: "#ff9900",
    text_color: "#000000",
  },
  {
    value: "microsoft",
    label: "Microsoft",
    icon: <FaMicrosoft />,
    bg_color: "#f35022",
    text_color: "#ffffff",
  },
  {
    value: "skype",
    label: "Skype",
    icon: <FaSkype />,
    bg_color: "#0078d7",
    text_color: "#ffffff",
  },
  {
    value: "quora",
    label: "Quora",
    icon: <FaQuora />,
    bg_color: "#aa2200",
    text_color: "#ffffff",
  },
  {
    value: "soundcloud",
    label: "Sound Cloud",
    icon: <FaSoundcloud />,
    bg_color: "#ff3300",
    text_color: "#ffffff",
  },
  {
    value: "dribbble",
    label: "Dribbble",
    icon: <FaDribbble />,
    bg_color: "#ea4c89",
    text_color: "#ffffff",
  },
  {
    value: "medium",
    label: "Medium",
    icon: <FaMedium />,
    bg_color: "#02b875",
    text_color: "#ffffff",
  },
  {
    value: "vimeo",
    label: "Vimeo",
    icon: <FaVimeo />,
    bg_color: "#1ab7ea",
    text_color: "#ffffff",
  },
  {
    value: "telegram",
    label: "Telegram",
    icon: <FaTelegram />,
    bg_color: "#0088cc",
    text_color: "#ffffff",
  },
  {
    value: "other",
    label: "Other",
    icon: <FaLink />,
    bg_color: "#2e2e3e",
    text_color: "#ffffff",
  },
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
  const response = await  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/links/get-links-for-username/`, { username });
  const links : LinkType[] = response.data;

  const profileResponse = await  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profiles/get-profile-by-username/`, { username });
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
