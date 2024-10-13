
import axios from "axios";
import ProfileForm from "./component/ProfileForm";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Skeleton } from "@nextui-org/skeleton";


export const metadata = {
  title: "Edit Profile",
  description: "Page to edit your profile.",
};



export default function page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <> 
      <ProfileForm />
    </>
  );
}
