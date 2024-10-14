"use client";

import { RootState, useAppDispatch } from "@/redux/store";
import { useSelector } from "react-redux";
import Button from "./utils/Button";
import Link from "next/link";
import { FiEdit, FiExternalLink } from "react-icons/fi";
import { useMyProfile } from "@/hooks/auth";
import Auth from "./Auth";
import { useEffect, useState } from "react";
import getPageContent from "@/helpers/getPageContent";
import { signOut } from "@/redux/slices/authSlice";
import { toast } from "react-toastify";

export default function EndHeaderPart({
  previewHeader = false,
  pageContent,
}: {
  previewHeader?: boolean;
  pageContent: any;
}) {
  const auth = useSelector((state: RootState) => state.auth?.data);

  return (
    <>
      {previewHeader ? (
        <Link href={"/links"}>
          <Button rightIcon={<FiEdit size={24} />}>
            {auth?.access
              ? pageContent?.button_text_update_profile
              : pageContent?.button_text_create_profile}
          </Button>
        </Link>
      ) : (
        <>
          <NotForPreview pageContent={pageContent} />
        </>
      )}
    </>
  );
}

function NotForPreview({ pageContent }: any) {
  const myProfile = useMyProfile();
  const auth = useSelector((state: RootState) => state.auth?.data);
  const dispatch = useAppDispatch();

  return (
    <>
      <Link target="_blank" href={`/${myProfile?.data?.username}`}>
        <Button
          className="lg:text-base lg:py-3 lg:px-6 sm:flex hidden"
          size="sm"
          rightIcon={<FiExternalLink size={24} />}
        >
          {pageContent?.button_text_preview}
        </Button>
      </Link>

      {auth?.access ? (
        <Button
          className="lg:text-base lg:py-3 lg:px-6"
          size="sm"
          variant="transparent"
          onClick={() => {
            dispatch(signOut());
            toast.success("Successfully Signed Out");
          }}
        >
          {pageContent?.button_text_sign_out}
        </Button>
      ) : (
        <Auth pageContent={pageContent} />

      )}

    </>
  );
}
