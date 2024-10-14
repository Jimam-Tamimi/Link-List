
import UrlComponent from "./UrlComponent";
import { unstable_setRequestLocale } from "next-intl/server";
import getPageContent from "@/helpers/getPageContent";
import { Metadata } from "next";
 

export async function generateMetadata({ params }: any): Promise<Metadata> {

  const pageContent = await getPageContent('links')
 
  
  return {
    title: pageContent?.metaTitle,
    description: pageContent?.metaDescription,
    
  };
}


export default async function page({ params }: { params: { locale: string } }) {
  const pageContent = await getPageContent('links')
  const { locale } = params;
  
  unstable_setRequestLocale(locale);

  return (
    <>

      <UrlComponent pageContent={pageContent} />
    </>
  );
}
export const dynamic = 'force-dynamic';
