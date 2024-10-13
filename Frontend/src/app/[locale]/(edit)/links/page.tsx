
import axios from "axios";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import UrlComponent from "./UrlComponent";
import { unstable_setRequestLocale } from "next-intl/server";

export const metadata = {
  title: "Edit Links",
  description: "Page to create new links, edit and delete existing links.",
};


export default function page({ params }: { params: { locale: string } }) {
  const { locale } = params;
  unstable_setRequestLocale(locale);

  return (
    <>

      <UrlComponent />
    </>
  );
}
export const dynamic = 'force-dynamic';
