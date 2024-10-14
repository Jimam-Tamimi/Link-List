import { useForm } from "react-hook-form";
import Input from "../utils/Input";
import {  MdAlternateEmail } from "react-icons/md";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordLine } from "react-icons/ri";
import { useSignUp } from "@/hooks/auth"; // Import the useSignUp hook
import { toast } from "react-toastify";
import Button from "../utils/Button";
import { AxiosError } from "axios";
import { SignUpFormDataType } from "@/api-calls/auth";

export default function SignUp({ pageContent }: { pageContent: any }) {
  const {
    register,
    handleSubmit,
    setError, // Add setError from react-hook-form
    formState: { errors },
  } = useForm<SignUpFormDataType>();

  const signUpMutation = useSignUp(); // Use the useSignUp hook

  const onSubmit = (data: SignUpFormDataType) => {
    if (data.password !== data.confirmPassword) {
      setError("confirmPassword", {
        type: "manual",
        message: "Passwords do not match",
      });
      return;
    }

    signUpMutation.mutate(data, {
      onSuccess: () => {
        // toast.success("Successfully created a new account!");
      },
      onError: (error: AxiosError) => {
        if (error.response) {
          switch (error.response.status) {
            case 400:
              toast.error("Bad request. Please check your input.");
              break;
            case 401:
              toast.error("Unauthorized. Please check your credentials.");
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
          leftIcon={<MdAlternateEmail />}
          type="text"
          label={pageContent?.text_input_label_username}
          {...register("username", {
            required: "Username is required",
          })}
          error={errors.username?.message}
          required
        />
      </div>
      <div>
        <Input
          leftIcon={<HiOutlineMail />}
          type="text"
          label={pageContent?.text_input_label_email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: "Invalid email address",
            },
          })}
          error={errors.email?.message}
          required
        />
      </div>
      <div>
        <Input
          leftIcon={<RiLockPasswordLine />}
          type="password"
          label={pageContent?.text_input_label_password}
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={errors.password?.message}
          required
        />
      </div>
      <div>
        <Input
          leftIcon={<RiLockPasswordLine />}
          type="password"
          label={pageContent?.text_input_label_confirm_password}
          {...register("confirmPassword", {
            required: "Confirm Password is required",
          })}
          error={errors.confirmPassword?.message}
          required
        />
      </div>

      <Button
        className="w-full hover:!scale-100 active:!scale-95 transition-all duration-300 ease-in-out mt-1"
        size="sm"
        type="submit"
        isLoading={signUpMutation.isPending}
      >
        {pageContent?.button_text_sign_up}
      </Button>
    </form>
  );
}
