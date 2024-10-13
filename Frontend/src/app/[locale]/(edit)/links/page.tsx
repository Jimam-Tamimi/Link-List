
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UrlComponent from "./UrlComponent";

export const metadata = {
  title: "Edit Links",
  description: "Page to create new links, edit and delete existing links.",
};


export default function page({ params }: { params: { locale: string } }) {
  const { locale } = params;

  return (
    <>

      <UrlComponent />
    </>
  );
}
