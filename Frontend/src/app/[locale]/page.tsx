import { redirect } from "@/i18n/routing";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function IndexPage({params: {locale: locale}}: {params: {locale: string}}) {
  unstable_setRequestLocale(locale);

  redirect('/links')
}
export const dynamic = 'force-dynamic';
