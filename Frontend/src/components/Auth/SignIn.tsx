"use client"
import { useForm } from "react-hook-form";
import Input from "../utils/Input";
import { MdOutlineClose } from "react-icons/md";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useSignIn } from "@/hooks/auth"; // Import the useSignIn hook
import { SignInFormDataType } from "@/api-calls/auth";
import { toast } from "react-toastify";
import Button from "../utils/Button";
import { AxiosError } from "axios"; 

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormDataType>();

  const signInMutation = useSignIn(); // Use the useSignIn hook

  const onSubmit = (data: SignInFormDataType) => {
    console.log(data);
    signInMutation.mutate(data, {
      onSuccess: async (data) => {
          toast.success("Signed in successfully!");
      },
      onError: (error:AxiosError) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("Please check your inputs.");
               break;
            case 401:
              toast.error("Username/Email or Password is incorrect. Please check again.");
              break;
            case 403:
              toast.error(
                "Forbidden. You do not have permission to perform this action."
              );
              break;
            case 404:
              toast.error(
                "Not found. The requested resource could not be found."
              );
              break;
            default:
              toast.error("An unexpected error occurred.");
              break;
          }
        }
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Input
          type="text"
          label="Email or Username"
          {...register("emailOrUsername", {
            required: "Email or Username is required",
          })}
          error={errors.emailOrUsername?.message}
          required
        />
      </div>
      <div>
        <Input
          type="password"
          label="Password"
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 4,
              message: "Password must be at least 4 characters",
            },
          })}
          error={errors.password?.message}
          required
        />
      </div>
      <Button
        className="w-full hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
        size="sm"
        type="submit"
        isLoading={signInMutation.isPending}
      >
        Submit
      </Button>
    </form>
  );
}
