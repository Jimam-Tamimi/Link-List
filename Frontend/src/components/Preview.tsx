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
import { socialMediaOptions } from "@/helpers/linkColors";

 
export default async function Preview({
  className,
  profile,
  links
}: {
  className?: string;
  profile:ProfileType | null,
  links:LinkType[]
}) {


  // console.log(username)
  // const { data: links, isPending } = useLinksByUsername(username);
  // const {data: profile,} = useProfileByUsername(username);
 
  return (
    <>
      <section
        className={` ${className} flex justify-center items-center z-50 `}
      >
        <div className="container flex flex-col justify-center gap-4  z-50 items-center py-10">
          <Image
            alt="photo frame"
            src={profile?.profile_image ? profile?.profile_image :'/images/unknown.webp' as any}
            width={800}
            height={800}
            className="object-cover object-center rounded-full w-32 h-32"
          />
          <div className=" font-semibold justify-center flex-col items-center gap-3 tracking-wider flex">
            <h1 className="text-[1.8rem] opacity-80">@{profile?.username}</h1>
            <h1 className="text-[1.9rem] capitalize">{profile?.first_name} {profile?.last_name}</h1>
          </div>
          <p className="text-center mb-5 leading-loose max-w-[900px] capitalize">
            {profile?.bio}
          </p>

          {links?.map((link, i) => {
            if(link?.url === "" ) return <></>;

            const platformData = socialMediaOptions.find(
              (option) => option.value === link?.platform
            ) || {
              label: link?.platform,
              value: link?.platform,
              bg_color: "#2e2e3e",
              text_color: "#ffffff",
              icon: <FaLink />,
            }
            
            return (
              <Link href={link?.url as any} target="_blank"  style={{backgroundColor: platformData?.bg_color, color:platformData?.text_color}} className=" text-white font-semibold tracking-wide cursor-pointer flex justify-between items-center py-5 px-6 hover:scale-[1.04] rounded-lg sm:w-[80%] w-[96%] max-w-[900px] active:scale-100 transition-all duration-300 ease-in-out my-2">
                <div className="flex text-lg gap-3 justify-center items-center">
                  {/* <FaGithub size={27} /> */}
                  {React.cloneElement(
                    platformData.icon || <FaLink />,
                    {
                      size: 27, // Get icon size
                    } as any
                  )}
                  <p>
                    {link?.platform?.split(" ")
                      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                      .join(" ")}
                  </p>{" "}
                </div>
                <FaArrowRightLong size={22} />
              </Link>
            )
          })}
        </div>
      </section>
    </>
  );
}
