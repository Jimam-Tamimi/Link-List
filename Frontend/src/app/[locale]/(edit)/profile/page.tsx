
import axios from "axios";
import ProfileForm from "./component/ProfileForm";

export default function page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <>
      <div className="space-y-2">
        <h2 className="text-3xl font-bold ">Customize Your Profile</h2>
        <p className="text-gray-700 dark:text-gray-300">
          Edit your profile below and then share it with the world!
        </p>
      </div>
      <ProfileForm />
    </>
  );
}
