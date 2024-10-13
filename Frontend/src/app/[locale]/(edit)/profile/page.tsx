
import axios from "axios";
import ProfileForm from "./component/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Skeleton } from "@nextui-org/skeleton";
import { unstable_setRequestLocale } from "next-intl/server";


export const metadata = {
  title: "Edit Profile",
  description: "Page to edit your profile.",
};



export default function page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  unstable_setRequestLocale(locale);

  return (
    <> 
      <ProfileForm />
    </>
  );
}
export const dynamic = 'force-dynamic';
