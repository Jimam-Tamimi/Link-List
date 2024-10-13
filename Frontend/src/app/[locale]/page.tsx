import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { Link, redirect } from "@/i18n/routing";
import axios from "axios";
import Image from "next/image";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function IndexPage({params: {locale}}) {
  unstable_setRequestLocale(locale);

  redirect('/links')
}
export const dynamic = 'force-dynamic';
