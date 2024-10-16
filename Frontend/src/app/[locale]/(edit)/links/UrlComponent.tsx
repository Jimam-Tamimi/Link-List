"use client";
import { FaLink, FaPlus } from "react-icons/fa";
import { MdOutlineDeleteSweep, MdOutlineLibraryAddCheck } from "react-icons/md";
import { LiaGripLinesSolid } from "react-icons/lia";
import Select from "@/components/utils/Select";

import Input from "@/components/utils/Input";
import { IoShareSocialSharp } from "react-icons/io5";
import {
  useDeleteLink,
  useLinksForMe,
  useUpdateLink,
  useUpdateLinkOrder,
} from "@/hooks/linkSharing";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useForm, SubmitHandler } from "react-hook-form";
import { useCreateLink } from "@/hooks/linkSharing";
import { LinkType } from "@/api-calls/linkSharing";
import { useQueryClient } from "@tanstack/react-query";
import { AnimatePresence, motion, Reorder } from "framer-motion";
import { toast } from "react-toastify";
import { HashLoader } from "react-spinners";
import { Tooltip } from "@nextui-org/tooltip";

import React, { useEffect, useState } from "react";
import { socialMediaOptions } from "@/helpers/linkColors";


export default function UrlComponent({pageContent}: {pageContent:any}) {
  const queryClient = useQueryClient(); 

  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const linksForMe = useLinksForMe();
  const createLink = useCreateLink();
  const updateLinkOrder = useUpdateLinkOrder();

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold ">{pageContent?.formTitle}</h2>
        <p className="text-gray-700 dark:text-gray-300">{pageContent?.formSubTitle}</p>
        {!username && 
        <p className="capitalize    text-xl font-semibold leading-relaxed text-red-600">{pageContent?.sign_in_demo_profile_error}</p>}
      </div>


      <Tooltip
        showArrow
        placement="top"
        content={ "Add New"}
        classNames={{
          base: [
            // arrow color
            "before:bg-neutral dark:before:bg-white",
          ],
          content: [
            "py-2 px-4 shadow-xl",
            "text-white bg-gradient-to-br font-semibold bg-gradient-to-br from-[#2563eb] to-[#0035a8]  tracking-wide",
          ],
        }}
      >
        <div
          className={`flex justify-center items-center p-2 rounded-full m-auto    bg-gradient-to-br from-[#2563eb] to-[#0035a8] opacity-90 transition-all duration-300 ease-in-out
            cursor-pointer active:scale-90 hover:opacity-100  hover:scale-110
          `}
          onClick={async (e) => {
            await createLink?.mutateAsync({id:Math?.random().toFixed(6) as any *1000000 , platform: "", url: "" } as any, {});
          }}
        >
          <FaPlus color="white" size={20} />
        </div>
      </Tooltip>

      <Reorder.Group
        axis="y"
        values={linksForMe?.data || []}
        onReorder={async (newOrder) => {
          await queryClient.setQueryData(
            ["links", username],
            (oldData: any) => {
              return newOrder;
            }
          );
           newOrder.map(async (newLink, index) => {
              const oldLink = linksForMe?.data?.[index];
              if (oldLink && newLink.id !== oldLink.id) {
                // newOrder[index].order = oldLink.order;
                await updateLinkOrder?.mutateAsync(
                  { id: newLink.id, order: oldLink.order }, 
                ); 
              }
              return null;
            })  
        }}
      >
        {
          linksForMe?.fetchStatus!='idle' ? 
          [1,2,3]?.map((link, i) => (
            <Reorder.Item className="" key={i} value={link}>
              <UrlForm pageContent={pageContent} key={i} i={i} link={null} isLoaded={linksForMe?.fetchStatus=='idle'} />
            </Reorder.Item>
          )) : 
          linksForMe?.data?.map((link, i) => (
            <Reorder.Item className="" key={link?.id} value={link}>
              <UrlForm pageContent={pageContent} key={link?.id} i={i} link={link} />
            </Reorder.Item>
          ))

        } 
      </Reorder.Group>
    </>
  );
}

const UrlForm = React.memo(({ link, i, isLoaded=true, pageContent }: { pageContent:any, link: (LinkType | null); i: number, isLoaded?:boolean }) => {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm<LinkType>();
  const [oldLink, setOldLink] = useState<LinkType | null>(null);

  useEffect(() => {
    reset(link as any);
    setOldLink(link);

    return () => {};
  }, []);

  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const createLink = useCreateLink();
  const updateLink = useUpdateLink(link?.id || null);
  const deleteLink = useDeleteLink(link?.id || null);

  const onSubmit: SubmitHandler<LinkType> = async (data) => {
    if (!username) {
      toast.error(
        "This is a demo link. Please sign in to create your own links and save it."
      );
      return;
    }
    if (!data?.created_at) {
      delete data?.id;
    }
    try {
      if (data?.id && oldLink) {
        const updatedFields = Object.keys(data).reduce((acc, key) => {
          if (data[key as keyof LinkType] !== oldLink[key as keyof LinkType]) {
            acc[key as keyof LinkType] = data[key as keyof LinkType] as any;
          }
          return acc;
        }, {} as Partial<LinkType>);

        if (Object.keys(updatedFields).length === 0) {
          return;
        }

        await updateLink?.mutateAsync(updatedFields, {
          onSuccess: (data) => {
            reset(data);
            setOldLink(data);
            toast.success("Link updated successfully!");
          },
        });
      } else {
        await createLink.mutateAsync(data, {
          onSuccess: () => {
            reset(data);
            setOldLink(data);
            toast.success("Link saved successfully!");
          },
        });
      }

      reset();
    } catch (error) {
      toast.error("Failed to save link. Please try again.");
    }
  };

  const queryClient = useQueryClient();

  useEffect(() => {
    const subscription = watch((value) => {
      queryClient.setQueryData(
        ["links", username],
        (oldData: LinkType[] | undefined) =>
          oldData?.map((oldLink) =>
            oldLink.id === link?.id ? watch() : oldLink
          )
      );
    });

    return subscription.unsubscribe;
  }, [watch(), queryClient]);

  return (
    <>
      <motion.div
        layout
        className="flex flex-col items-stretch justify-center gap-2 p-4  pb-1  border-gray-800 rounded dark:border-gray-200 dark:shadow-[0_0px_2px_#ffffff50] shadow-[0_0px_2px_#00000050]"
        initial={{ opacity: 0, }}
        animate={{ opacity: 1, }}
        exit={{ opacity: 0, }}
        transition={{ duration: 0.5, ease: "anticipate" }}
      >
        <div className="flex items-center justify-between ">
          <LiaGripLinesSolid
            size={30}
            className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95"
          />
          <div className="relative flex items-center justify-end">
            <AnimatePresence initial={false}>
              {Object.keys(watch()).some(
                (key) =>
                  oldLink &&
                  watch(key as keyof LinkType) !==
                    oldLink[key as keyof LinkType]
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
                    content="Save"
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
                        onClick={() => handleSubmit(onSubmit)()}
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
                        if (!username) {
                          toast.error(
                            "This is a demo link. Please sign in to create your own links and customize it."
                          );
                          return;
                        }
                        if (!link?.created_at) {
                          queryClient.setQueryData(
                            ["links", username],
                            (oldData: LinkType[]) => {
                              if (!oldData) return;
                              let newData = oldData.filter(
                                (oldLink) => oldLink?.uid !== link?.uid
                              );
                              setOldLink(null);

                              return newData;
                            }
                          );
                        } else {
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
                        }
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
            label={`${pageContent?.form_input_label_platform} ${i + 1}`}
            options={socialMediaOptions}
            onSelect={(option) =>
              option ? setValue("platform", option?.value) : "other"
            }
            {...register(`platform`)}
            error={errors?.platform?.message}
            defaultValue={
              link?.id
                ? socialMediaOptions.find(
                    (option) => option.value === link?.platform
                  ) || {
                    label: link?.platform,
                    value: link?.platform,
                    bg_color:'#2e2e3e',
                    icon: <FaLink />,
                  } as any
                : null
            }
            isLoaded={isLoaded}

          />

          <Input
            id={`link-${i + 1}`}
            type="url"
            placeholder={pageContent?.form_input_placeholder_link}
            label={`${pageContent?.form_input_label_link} ${i + 1}`}
            leftIcon={<FaLink size={15} />}
            {...register(`url`, {
              required: "URL is required",

              pattern: {
                value: /^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/,
                message: "Enter a valid URL",
              },
            })}
            error={errors?.url?.message}
            isLoaded={isLoaded}
          />
        </div>
      </motion.div>
    </>
  );
});
