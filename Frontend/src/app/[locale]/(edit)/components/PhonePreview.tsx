"use client";
import { useLinksForMe } from "@/hooks/linkSharing";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLink } from "react-icons/fa";
import { FaArrowRightLong } from "react-icons/fa6";
import { useMyProfile } from "@/hooks/auth";
import { socialMediaOptions } from "@/helpers/linkColors";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Button from "@/components/utils/Button";
import { FiExternalLink } from "react-icons/fi";
import getPageContent from "@/helpers/getPageContent";
import axios from "axios";

export default function PhonePreview({ pageContent }: { pageContent: any }) {
  const linksForMe = useLinksForMe();
  const myProfile = useMyProfile();

  return (
    <>
      {/* <SkeletonTheme baseColor="#261d46" highlightColor="#382c63"> */}

      <div className="lg:w-[30%] xl:w-[27%]   md:w-6/12 w-[70%] sticky top-5 bottom-5 ">
        <div className="relative    ">
          <Image
            alt="photo frame"
            src={"/images/phone-frame.webp"}
            width={1000}
            height={1000}
          />
          <div
            className={`absolute  top-0  bottom-0 right-0 m-auto  no-scrollbar left-0     overflow-scroll flex flex-col justify-start max-w-[87%] max-h-[90%] py-10   items-center gap-${
              myProfile?.fetchStatus != "idle" &&
              linksForMe?.fetchStatus == "idle"
                ? "8"
                : "4"
            } `}
          >
            <div>
              {myProfile?.fetchStatus != "idle" ? (
                <>
                  <Skeleton
                    circle
                    className="w-full h-full"
                    containerClassName="w-24 h-24  block"
                  />{" "}
                </>
              ) : (
                <Image
                  alt="photo frame"
                  src={
                    myProfile?.data?.profile_image
                      ? myProfile?.data?.profile_image
                      : ("/images/unknown.webp" as any)
                  }
                  width={800}
                  height={800}
                  className="object-cover object-center w-24 h-24 rounded-full"
                />
              )}
            </div>
            <div
              className={`flex flex-col items-center w-full *:text-center justify-center  font-semibold tracking-wider gap-${
                myProfile?.fetchStatus != "idle" ? "5" : "2"
              } `}
            >
              <h1 className="text-[1.3rem] min-w-[30%]  text-center opacity-80">
                {myProfile?.fetchStatus != "idle" ? (
                  <>
                    <Skeleton
                      className="w-full h-full"
                      containerClassName="w-full h-[1.3rem]  block"
                    />{" "}
                  </>
                ) : (
                  <>
                    {myProfile?.data?.username && "@"}
                    {myProfile?.data?.username}
                  </>
                )}
              </h1>
              <h1 className="text-[1.4rem] min-w-[50%] capitalize">
                {myProfile?.fetchStatus != "idle" || (!myProfile?.data?.first_name && !myProfile?.data?.last_name)? (
                  <>
                    <Skeleton
                      className="w-full h-full"
                      containerClassName="w-full h-[1.4rem]  block"
                    />{" "}
                  </>
                ) : (
                  <>
                    {myProfile?.data?.first_name
                      ? myProfile?.data?.first_name
                      : ""}
                      {" "}
                      {myProfile?.data?.last_name
                      ? myProfile?.data?.last_name
                      : ""}
                  </>
                )}
              </h1>
            </div>
            <p className="text-center  text-sm mb-2 flex justify-center items-center flex-col gap-3   leading-loose capitalize min-w-[80%] max-w-[900px]">
              {myProfile?.fetchStatus != "idle" || !myProfile?.data?.bio ? (
                <>
                  <Skeleton
                    className="w-full h-full"
                    containerClassName="w-[75%]  h-[12px]  block"
                  />
                  <Skeleton
                    className="w-full h-full"
                    containerClassName="w-full h-[12px]  block"
                  />
                  <Skeleton
                    className="w-full h-full"
                    containerClassName="w-[60%]  h-[12px]  block"
                  />
                </>
              ) : (
                <>{myProfile?.data?.bio}</>
              )}
            </p>

            {linksForMe?.fetchStatus != "idle" || linksForMe?.data?.length == 0
              ? [1, 2, 3].map(() => (
                  <Skeleton
                    className="w-full h-full"
                    containerClassName="w-[96%]  h-[60px] rounded-lg  block"
                  />
                ))
              : linksForMe?.data?.map((link, i) => {
                  const selectedPlatform = socialMediaOptions.find(
                    (option) => option.value === link?.platform
                  ) || {
                    label: link?.platform,
                    value: link?.platform,
                    bg_color: "#2e2e3e",
                    text_color: "#ffffff",
                    icon: <FaLink />,
                  };

                  return (
                    <Link
                      href={link?.url ? link?.url : ""}
                      target="_blank"
                      style={
                        {
                          backgroundColor: selectedPlatform?.bg_color,
                          color: selectedPlatform?.text_color,
                        } as any
                      }
                      className={`  font-semibold tracking-wide cursor-pointer flex justify-between items-center p-4 hover:scale-[1.04] rounded-lg  w-[96%] max-w-[100%] active:scale-100 transition-all duration-300 ease-in-out my-1`}
                    >
                      <div className="flex items-center justify-center gap-3 text-lg">
                        {/* <FaGithub size={27} /> */}

                        {React.cloneElement(
                          selectedPlatform.icon || <FaLink />,
                          {
                            size: 27, // Get icon size
                          } as any
                        )}

                        <p>
                          {link?.platform
                            ?.split(" ")
                            .map(
                              (word) =>
                                word.charAt(0).toUpperCase() + word.slice(1)
                            )
                            .join(" ")}
                        </p>
                      </div>
                      <FaArrowRightLong size={22} />
                    </Link>
                  );
                })}
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
      <Link target="_blank" href={`/${myProfile?.data?.username}`}>
        <Button
          className="lg:text-base lg:py-3 lg:px-6 block md:hidden"
          size="sm"
          rightIcon={<FiExternalLink size={24} />}
        >
          {pageContent?.button_text_preview}
        </Button>
      </Link>
      {/* </SkeletonTheme>   */}
    </>
  );
}
