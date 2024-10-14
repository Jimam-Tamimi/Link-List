"use client";
import ProfilePictureUploader from "@/components/ProfilePictureUploader";
import React, { useState } from "react";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import { FaGripLines, FaLink, FaPlus } from "react-icons/fa";
import {
  MdAlternateEmail,
  MdOutlineBadge,
  MdOutlineDeleteSweep,
  MdOutlineLibraryAddCheck,
} from "react-icons/md";
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
import { useMyProfile, useUpdateProfile } from "@/hooks/auth";
import { useForm, SubmitHandler } from "react-hook-form";
import { ProfileType } from "@/api-calls/auth";
import api from "@/api-calls/api";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

interface ProfileFormInputs {
  first_name: string;
  last_name: string;
  bio: string;
  username: string;
  email: string;
  profile_image: File;
}

export default function ProfileForm({pageContent}:{pageContent:any}) {
  const myProfile = useMyProfile();
  const updateProfile = useUpdateProfile();
  const auth = useSelector((state: RootState) => state.auth?.data);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProfileFormInputs>();

  const [oldMyProfileData, setOldMyProfileData] = useState<ProfileType>();

  React.useEffect(() => {
    setOldMyProfileData(myProfile?.data);
    reset({
      bio: myProfile?.data?.bio ? myProfile?.data?.bio : "",
      first_name: myProfile?.data?.first_name || "",
      last_name: myProfile?.data?.last_name || "",
      username: myProfile?.data?.username || "",
      email: myProfile?.data?.email || "",
    });
  }, [myProfile?.isError, myProfile?.isFetched]);

  // Handle form submission
  const onSubmit = async (data: ProfileFormInputs) => {
    if (!auth?.access) {
      toast.error(
        "This is a demo profile. Please sign in to create your own profile and customize it."
      );
      return;
    }

    const formData = new FormData();

    // Append form data to send to the backend
    if (data.bio !== oldMyProfileData?.bio) {
      formData.append("bio", data.bio);
    }
    if (data.first_name !== oldMyProfileData?.first_name) {
      formData.append("first_name", data.first_name);
    }
    if (data.last_name !== oldMyProfileData?.last_name) {
      formData.append("last_name", data.last_name);
    }
    if (data.username !== oldMyProfileData?.username) {
      formData.append("username", data.username);
    }
    if (data.email !== oldMyProfileData?.email) {
      formData.append("email", data.email);
    }
    if (
      data?.profile_image &&
      data?.profile_image?.type?.startsWith("image/")
    ) {
      formData.append("profile_image", data?.profile_image);
    }

    // Append profile image if it exists
    // if (data.profile_image && data.profile_image.length > 0) {
    //   formData.append("profile_image", data.profile_image[0]); // Only select the first image
    // }

    await updateProfile?.mutateAsync(formData as any, {
      onSuccess: (data) => {
        reset(data);
        toast.success("Profile updated successfully!");
      },
      onError: (error: any) => {
        toast.error(`Failed to update profile!`);
      },
    });
  };

  const queryClient = useQueryClient();

  const profileId = useSelector(
    (state: RootState) => state.auth.data?.profile?.id
  );
  React.useEffect(() => {
    // Store the watched field values in the QueryClient

    const subscription = watch((value) => {
      if (value?.profile_image && value?.profile_image instanceof File) {
        const file = value?.profile_image;
        const imageUrl = URL.createObjectURL(file);
        value.profile_image = imageUrl as any;
      } else {
        value.profile_image = myProfile?.data?.profile_image as any;
      }
      queryClient.setQueryData(["profile", profileId], value);
    });

    return subscription.unsubscribe;
  }, [watch()]);

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold ">{pageContent?.formTitle}</h2>
        <p className="text-gray-700 dark:text-gray-300">{pageContent?.formSubTitle}</p>
        {!auth?.access && (
          <p className=" text-xl capitalize font-semibold leading-relaxed text-red-600">{pageContent?.sign_in_demo_profile_error}</p>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col justify-center items-stretch gap-4"
      >
        <div className="flex justify-between w-full items-center gap-8 md:flex-row flex-col">
          <Input
            leftIcon={<MdOutlineBadge />}
            type="text"
            label={pageContent?.text_input_label_first_name}
            {...register("first_name", { required: "First Name is required" })}
            isLoaded={myProfile?.fetchStatus == "idle"}
            required
          />

          <Input
            leftIcon={<MdOutlineBadge />}
            type="text"
            label={pageContent?.text_input_label_last_name}
            required
            {...register("last_name", { required: "Last Name is required" })}
            isLoaded={myProfile?.fetchStatus == "idle"}
          />
        </div>
        <Input
          leftIcon={<LuFileText />}
          type="text"
          label={pageContent?.text_input_label_bio}
          required
          {...register("bio", { required: "Bio is required" })}
          isLoaded={myProfile?.fetchStatus == "idle"}
        />
        <Input
          leftIcon={<MdAlternateEmail />}
          type="text"
          label={pageContent?.text_input_label_username}
          {...register("username", { required: "Username is required" })}
          required
          isLoaded={myProfile?.fetchStatus == "idle"}
        />
        <Input
          leftIcon={<HiOutlineMail />}
          type="email"
          label={pageContent?.text_input_label_email}
          {...register("email", { required: "Email is required" })}
          required
          isLoaded={myProfile?.fetchStatus == "idle"}
        />

        <ProfilePictureUploader
          label={pageContent?.image_input_label_profile_picture}

          onUpload={(e) => setValue("profile_image", e.get("image") as File)}
          {...register("profile_image")}
        />
        {errors?.profile_image && <p>{errors?.profile_image?.message}</p>}

        <Button
          className="md:self-end self-stretch hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
          size="sm"
          type="submit"
          isLoading={updateProfile?.isPending}
        >
          {pageContent?.button_text}
          
        </Button>
      </form>
    </>
  );
}
