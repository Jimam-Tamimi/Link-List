import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link, redirect } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";

export default async function Home({ params }: { params: { locale: string } }) {
  redirect(`/links`) // Navigate to the new post page

}
