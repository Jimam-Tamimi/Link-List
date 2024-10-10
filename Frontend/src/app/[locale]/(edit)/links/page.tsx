"use client";
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
import {
  useDeleteLink,
  useLinksForMe,
  useUpdateLink,
} from "@/hooks/linkSharing";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { link } from "fs";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateLink } from "@/hooks/linkSharing";
import { LinkType } from "@/api-calls/linkSharing";
import { useQueryClient } from "@tanstack/react-query";
import { profile } from "console";
import { v4 as uuidv4 } from "uuid";
import { AnimatePresence, motion } from "framer-motion";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";

export const socialMediaOptions = [
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

export default function Home({ params }: { params: { locale: string } }) {
  const { locale } = params;
  const queryClient = useQueryClient();
  // const response = await axios.get(
  //   `http://127.0.0.1:8000/static/content/${locale}/home.json`
  // );
  // const content = response.data;

  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";

  const { data: links, isLoading: loading } = useLinksForMe();
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
      <div
        className="flex justify-center items-center p-2 rounded-full m-auto    bg-gradient-to-br from-[#2563eb] to-[#0035a8] opacity-90 active:scale-90 hover:opacity-100 cursor-pointer hover:scale-110 transition-all duration-300 ease-in-out"
        onClick={(e) => {
          queryClient.setQueryData(["links", username], (oldData: any) => {
            if(!Array?.isArray(oldData)){
              return oldData
            } 
            return [
              {
                uid: uuidv4().slice(0, 10),
                platform: "",
                url: "",
                profile: auth?.profile?.id,
                bg_color: "#000000",
              },
              ...oldData,
            ];
          });
        }}
      >
        <FaPlus color="white" size={20} />
      </div>
      {links?.map((link, i) => (
        <>
          <UrlForm key={uuidv4()} i={i} link={link} />
        </>
      ))}
    </>
  );
}

function UrlForm({ link, i }: { link: LinkType; i: number }) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<LinkType>({
    defaultValues: link,
  });
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const createLink = useCreateLink();
  const updateLink = useUpdateLink(link?.id || null);
  const deleteLink = useDeleteLink(link?.id || null);

  const onSubmit: SubmitHandler<LinkType> = async (data) => {
    console.log(data);
    try {
      if (data?.id) {
        const updatedFields = Object.keys(data).reduce((acc, key) => {
          if (data[key as keyof LinkType] !== link[key as keyof LinkType]) {
            acc[key as keyof LinkType] = data[key as keyof LinkType] as any;
          }
          return acc;
        }, {} as Partial<LinkType>);

        if (Object.keys(updatedFields).length === 0) {
          return;
        }

        await updateLink?.mutateAsync(updatedFields, {
          onSuccess: () => {
            toast.success("Link updated successfully!");
          },
        });
      } else {
        await createLink.mutateAsync(data, {
          onSuccess: () => {
            toast.success("Link saved successfully!");
          },
        });
      }

      reset();
    } catch (error) {
      toast.error("Failed to save link. Please try again.");
    }
  };

  return (
    <>
      <div className="flex flex-col items-stretch justify-center gap-2 p-4  pb-1  border-gray-800 rounded dark:border-gray-200 dark:shadow-[0_0px_2px_#ffffff50] shadow-[0_0px_2px_#00000050]">
        <div className="flex items-center justify-between ">
          <LiaGripLinesSolid
            size={30}
            className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95"
          />
          <div className="relative flex items-center justify-end">
            <AnimatePresence initial={false}>
              {Object.keys(watch()).some(
                (key) =>
                  watch(key as keyof LinkType) !== link[key as keyof LinkType]
              ) ? (
                updateLink?.isPending || createLink.isPending ? (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <HashLoader size={23} color="#22c55e" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="check"
                    initial={{ opacity: 0, scale: 0.0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.0 }}
                    transition={{ duration: 0.2 }}
                    className="absolute"
                  >
                    <MdOutlineLibraryAddCheck
                      size={25}
                      onClick={handleSubmit(onSubmit)}
                      className="text-green-500 transition-all duration-300 ease-in-out cursor-pointer hover:green-red-600 hover:scale-105 active:scale-95"
                    />
                  </motion.div>
                )
              ) : deleteLink?.isPending ? (
                <motion.div
                  key="check"
                  initial={{ opacity: 0, scale: 0.0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <HashLoader size={23} color="#ef4444" />
                </motion.div>
              ) : (
                <motion.div
                  key="delete"
                  initial={{ opacity: 0, scale: 0.0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.0 }}
                  transition={{ duration: 0.2 }}
                  className="absolute"
                >
                  <MdOutlineDeleteSweep
                    onClick={async () => {
                      await deleteLink?.mutateAsync(undefined, {
                        onSuccess: () => {
                          toast.success("Link deleted successfully!");
                        },
                        onError: () => {
                          toast.error(
                            "Failed to delete link. Please try again."
                          );
                        },
                      });
                    }}
                    size={25}
                    className="text-red-500 transition-all duration-300 ease-in-out cursor-pointer hover:text-red-600 hover:scale-105 active:scale-95"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="flex flex-col items-start gap-5 lg:justify-between lg:flex-row">
          <Select
            iconLabel={<IoShareSocialSharp size={18} />}
            label={`Platform ${i + 1}`}
            options={socialMediaOptions}
            onSelect={(option) =>
              option ? setValue("platform", option?.value) : "other"
            }
            {...register(`platform`)}
            error={errors?.platform?.message}
            defaultValue={
              link?.id
                ? socialMediaOptions.find(
                    (option) => option.value === getValues("platform")
                  ) || {
                    label: link?.platform,
                    value: link?.platform,
                    icon: <FaLink />,
                  }
                : null
            }
          />

          <Input
            id={`link-${i + 1}`}
            type="url"
            placeholder="Enter Your Link"
            label={`Link ${i + 1}`}
            leftIcon={<FaLink size={15} />}
            {...register(`url`, {
              required: "URL is required",
 

              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL",
              },
            })}
            error={errors?.url?.message} 
          />
        </div>
      </div>
    </>
  );
}
