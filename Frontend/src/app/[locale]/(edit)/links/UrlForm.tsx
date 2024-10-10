import React, { memo, useCallback } from "react";
import isEqual from "lodash/isEqual"; // Import a deep comparison function
import { useForm, SubmitHandler } from "react-hook-form";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { LiaGripLinesSolid } from "react-icons/lia";
import { MdOutlineLibraryAddCheck, MdOutlineDeleteSweep } from "react-icons/md";
import { IoShareSocialSharp } from "react-icons/io5";
import { FaLink } from "react-icons/fa";
import { HashLoader } from "react-spinners";
import { toast } from "react-toastify";
import { LinkType } from "@/api-calls/linkSharing";
import { RootState } from "@/redux/store";
import { useCreateLink, useDeleteLink, useUpdateLink } from "@/hooks/linkSharing";
import Select from "@/components/utils/Select";
import Input from "@/components/utils/Input";
 

const UrlForm = memo(function UrlForm({ link, i }: { link: LinkType; i: number }) {
  const { register, handleSubmit, reset, setValue, watch, getValues } = useForm<LinkType>({
    defaultValues: link,
  });

  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const createLink = useCreateLink();
  const updateLink = useUpdateLink(link?.id || null);
  const deleteLink = useDeleteLink(link?.id || null);

  const onSubmit: SubmitHandler<LinkType> = useCallback(async (data) => {
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
      toast.success("Link saved successfully!");
    } catch (error) {
      toast.error("Failed to save link. Please try again.");
    }
  }, [link, updateLink, createLink, reset]);

  return (
    <div className="flex flex-col items-stretch justify-center gap-2 p-4 pt-3  border-gray-800 rounded dark:border-gray-200 dark:shadow-[0_0px_2px_#ffffff50] shadow-[0_0px_2px_#00000050]">
      <div className="flex items-center justify-between ">
        <LiaGripLinesSolid
          size={30}
          className="transition-all duration-300 ease-in-out cursor-pointer hover:scale-105 active:scale-95"
        />
        <div className="relative flex items-center justify-end">
          <AnimatePresence>
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
                  <HashLoader size={20} color="#22c55e" />
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
                <HashLoader size={20} color="#ef4444" />
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
          defaultValue={
            socialMediaOptions.find(
              (option) => option.value === getValues("platform")
            ) || {
              label: link?.platform,
              value: link?.platform,
              icon: <FaLink />,
            }
          }
        />
        <Input
          id={`link-${i + 1}`}
          type="url"
          placeholder="Enter Your Link"
          label={`Link ${i + 1}`}
          leftIcon={<FaLink size={15} />}
          {...register(`url`)}
          defaultValue={link?.url ? link?.url : ""}
        />
      </div>
    </div>
  );
}, (prevProps, nextProps) => isEqual(prevProps.link, nextProps.link));

export default UrlForm;
