
import PreLoader from "@/components/PreLoader";
import { HashLoader } from "react-spinners";

export const metadata = {
  title: "Edit Links",
  description: "Page to create new links, edit and delete existing links.",
};


export default function loading() {

  return (
    <div className="flex bg-transparent  justify-center items-center min-h-screen w-screen *:text-4xl">
        <PreLoader   />
    </div>
  );
}
