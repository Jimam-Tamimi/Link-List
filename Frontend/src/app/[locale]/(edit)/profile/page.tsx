
import ProfileForm from "./component/ProfileForm";
import { unstable_setRequestLocale } from "next-intl/server";
import getPageContent from "@/helpers/getPageContent";
import { Metadata } from "next";


 

export async function generateMetadata({ params }: any): Promise<Metadata> {

  const pageContent = await getPageContent('profile')
 
  
  return {
    title: pageContent?.metaTitle,
    description: pageContent?.metaDescription,
    
  };
}



export default async function page({ params }: { params: { locale: string } }) {
  const pageContent = await getPageContent('profile')
  const { locale } = params;
  unstable_setRequestLocale(locale);

  return (
    <> 
      <ProfileForm  pageContent={pageContent} />
    </>
  );
}
export const dynamic = 'force-dynamic';
