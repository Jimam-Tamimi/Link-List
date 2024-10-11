"use client";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import { FaGripLines,  FaPlus } from "react-icons/fa";
import { MdOutlineDeleteSweep, MdOutlineLibraryAddCheck } from "react-icons/md";
import { LiaGripLinesSolid } from "react-icons/lia";
import Select from "@/components/utils/Select";
 
import { IoMdCheckboxOutline } from "react-icons/io";
import Input from "@/components/utils/Input";
import { BsYoutube } from "react-icons/bs";
import { IoShareSocialSharp } from "react-icons/io5";
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
import { Tooltip } from "@nextui-org/tooltip";
import { FaFacebook, FaTwitter, FaInstagram, FaWhatsapp, FaYoutube, FaLinkedin, FaGoogle, FaGithub, FaSnapchat, FaReddit, FaPinterest, FaTiktok, FaTwitch, FaDiscord, FaApple, FaAmazon, FaMicrosoft, FaSkype, FaQuora, FaSoundcloud, FaDribbble, FaMedium, FaVimeo, FaTelegram, FaLink } from "react-icons/fa";



export const socialMediaOptions = [
  {
    value: "facebook",
    label: "Facebook",
    icon: <FaFacebook />,
    bg_color: "#1877f2", // Darker Facebook color
    textColor: "#ffffff", // White text
  },
  {
    value: "twitter",
    label: "Twitter",
    icon: <FaTwitter />,
    bg_color: "#1da1f2", // Darker Twitter color
    textColor: "#ffffff", // White text
  },
  {
    value: "instagram",
    label: "Instagram",
    icon: <FaInstagram />,
    bg_color: "#c32aa3", // Darker Instagram color
    textColor: "#ffffff", // White text
  },
  {
    value: "whatsapp",
    label: "WhatsApp",
    icon: <FaWhatsapp />,
    bg_color: "#25d366", // Darker WhatsApp color
    textColor: "#ffffff", // White text
  },
  {
    value: "youtube",
    label: "Youtube",
    icon: <FaYoutube />,
    bg_color: "#ff0000", // Darker YouTube color
    textColor: "#ffffff", // White text
  },
  {
    value: "linkedin",
    label: "LinkedIn",
    icon: <FaLinkedin />,
    bg_color: "#0a66c2", // Darker LinkedIn color
    textColor: "#ffffff", // White text
  },
  {
    value: "google",
    label: "Google",
    icon: <FaGoogle />,
    bg_color: "#db4437", // Darker Google color
    textColor: "#ffffff", // White text
  },
  {
    value: "github",
    label: "GitHub",
    icon: <FaGithub />,
    bg_color: "black", // Darker GitHub color
    textColor: "#ffffff", // White text
  },
  {
    value: "snapchat",
    label: "Snapchat",
    icon: <FaSnapchat />,
    bg_color: "#fffc00", // Darker Snapchat color
    textColor: "#333333", // Dark text for contrast
  },
  {
    value: "reddit",
    label: "Reddit",
    icon: <FaReddit />,
    bg_color: "#ff5700", // Darker Reddit color
    textColor: "#ffffff", // White text
  },
  {
    value: "pinterest",
    label: "Pinterest",
    icon: <FaPinterest />,
    bg_color: "#bd081c", // Darker Pinterest color
    textColor: "#ffffff", // White text
  },
  {
    value: "tiktok",
    label: "TikTok",
    icon: <FaTiktok />,
    bg_color: "#ee1d52", // Darker TikTok color
    textColor: "#ffffff", // White text
  },
  {
    value: "twitch",
    label: "Twitch",
    icon: <FaTwitch />,
    bg_color: "#9146ff", // Darker Twitch color
    textColor: "#ffffff", // White text
  },
  {
    value: "discord",
    label: "Discord",
    icon: <FaDiscord />,
    bg_color: "#5865f2", // Darker Discord color
    textColor: "#ffffff", // White text
  },
  {
    value: "apple",
    label: "Apple",
    icon: <FaApple />,
    bg_color: "#000000", // Darker Apple color
    textColor: "#ffffff", // White text
  },
  {
    value: "amazon",
    label: "Amazon",
    icon: <FaAmazon />,
    bg_color: "#ff9900", // Darker Amazon color
    textColor: "#000000", // Dark text for contrast
  },
  {
    value: "microsoft",
    label: "Microsoft",
    icon: <FaMicrosoft />,
    bg_color: "#f35022", // Darker Microsoft color
    textColor: "#ffffff", // White text
  },
  {
    value: "skype",
    label: "Skype",
    icon: <FaSkype />,
    bg_color: "#0078d7", // Darker Skype color
    textColor: "#ffffff", // White text
  },
  {
    value: "quora",
    label: "Quora",
    icon: <FaQuora />,
    bg_color: "#aa2200", // Darker Quora color
    textColor: "#ffffff", // White text
  },
  {
    value: "soundcloud",
    label: "Sound Cloud",
    icon: <FaSoundcloud />,
    bg_color: "#ff3300", // Darker SoundCloud color
    textColor: "#ffffff", // White text
  },
  {
    value: "dribbble",
    label: "Dribbble",
    icon: <FaDribbble />,
    bg_color: "#ea4c89", // Darker Dribbble color
    textColor: "#ffffff", // White text
  },
  {
    value: "medium",
    label: "Medium",
    icon: <FaMedium />,
    bg_color: "#02b875", // Darker Medium color
    textColor: "#ffffff", // White text
  },
  {
    value: "vimeo",
    label: "Vimeo",
    icon: <FaVimeo />,
    bg_color: "#1ab7ea", // Darker Vimeo color
    textColor: "#ffffff", // White text
  },
  {
    value: "telegram",
    label: "Telegram",
    icon: <FaTelegram />,
    bg_color: "#0088cc", // Darker Telegram color
    textColor: "#ffffff", // White text
  },
  {
    value: "other",
    label: "Other",
    icon: <FaLink />,
    bg_color: "#AFAFAF", // Darker color for other
    textColor: "#ffffff", // White text
  },
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
            if (!Array?.isArray(oldData)) {
              return oldData;
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

                  <Tooltip
                  showArrow
                  placement="top"
                  content="Delete"
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-neutral dark:before:bg-white",
                    ],
                    content: [
                      "py-2 px-4 shadow-xl",
                      "text-white bg-gradient-to-br font-semibold from-green-600 to-green-700 tracking-wide",
                    ],
                  }}
                >

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
                </Tooltip>

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
                <Tooltip
                  showArrow
                  placement="top"
                  content="Delete"
                  classNames={{
                    base: [
                      // arrow color
                      "before:bg-neutral dark:before:bg-white",
                    ],
                    content: [
                      "py-2 px-4 shadow-xl",
                      "text-white bg-gradient-to-br font-semibold from-red-600 to-red-700 tracking-wide",
                    ],
                  }}
                >
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
                </Tooltip>
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
