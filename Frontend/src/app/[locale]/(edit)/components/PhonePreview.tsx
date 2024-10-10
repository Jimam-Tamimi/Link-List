"use client";
import { useLinksForMe } from "@/hooks/linkSharing";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import React from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { socialMediaOptions } from "../links/page";

export default function PhonePreview() {
  const { data: links, isLoading: loading } = useLinksForMe();

  return (
    <>
      <div className="lg:w-[30%] xl:w-[27%]   w-6/12 ">
        <div className="relative ">
          <Image
            alt="photo frame"
            src={"/images/phone-frame.webp"}
            width={1000}
            height={1000}
          />
          <div className="absolute  top-0  bottom-0 right-0 m-auto  no-scrollbar left-0     overflow-scroll flex flex-col justify-start max-w-[87%] max-h-[90%] py-10 gap-4 items-center  ">
            <div>
              <Image
                alt="photo frame"
                src={"/images/me.webp"}
                width={800}
                height={800}
                className="object-cover object-center w-24 h-24 rounded-full"
              />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 font-semibold tracking-wider ">
              <h1 className="text-[1.3rem] opacity-80">@jimam_</h1>
              <h1 className="text-[1.4rem]">Jimamt Tamimi</h1>
            </div>
            <p className="text-center mb-2 leading-loose max-w-[900px]">
              hey this is jimam tamimi and this is my bio. How are you doing
              today?
              <span className="hidden">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore
                voluptate quod quae voluptatum officiis perferendis
              </span>
            </p>
            {links?.map((link, i) => (
              <Link
                href={link?.url as any}
                target="_blank"
                className="bg-black font-semibold tracking-wide cursor-pointer flex justify-between items-center p-6 hover:scale-[1.04] rounded-lg  w-[96%] max-w-[100%] active:scale-100 transition-all duration-300 ease-in-out"
              >
                <div className="flex items-center justify-center gap-3 text-lg">
                  {/* <FaGithub size={27} /> */}

                  {
                    React.cloneElement(
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
                    )
                  }

                  <p>
                    {link?.platform
                      .split(" ")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </p>
                </div>
                <FaArrowRightLong size={22} />
              </Link>
            ))}
          </div>
          {/* <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <Image
                  alt="photo frame"
                  src={"/images/me.webp"}
                  width={800}
                  height={800}
                  className="object-cover object-center rounded-full w-14 h-14"
                />
                <h1>jimamt amimi</h1>
              </div> */}
        </div>
      </div>
    </>
  );
}
