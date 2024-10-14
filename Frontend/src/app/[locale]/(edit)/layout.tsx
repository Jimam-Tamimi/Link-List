import { LayoutTransition } from "../../components/FramerLayout";
import Header from "@/components/Header/Header";
import PhonePreview from "./components/PhonePreview";
import getPageContent from "@/helpers/getPageContent";

export default async function RootLayout({
  children,

}: Readonly<{
  children: React.ReactNode;
}>) {
  // await new Promise((resolve) => setTimeout(resolve, 10000)); // to see the loading animation (will be removed)

  let pageContent = await getPageContent('components/Header')

  const authContent = await getPageContent('components/auth/index')
  pageContent = {...pageContent, ...authContent}

  return (
    <>
     
      <Header pageContent={pageContent} />

      <div className="flex items-center justify-between ">
        <div className="container relative flex flex-col items-center justify-between gap-10 mx-auto lg:flex-row lg:py-20 py-14 lg:gap-0 ">
          {/* Mobile Mockup Section */}

          <PhonePreview pageContent={pageContent} />

          {/* Link Customization Section */}
          <LayoutTransition
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            mode="popLayout"
            className="  lg:w-8/12 xl:w-[67%]  w-full"
          >
            <div className="gap-8 flex flex-col justify-center  *:tracking-wide    rounded-lg px-8 py-10 dark:shadow-[0_0px_15px_#ffffff20]    shadow-[0_0px_15px_#00000010]  backdrop-blur-[15px] dark:backdrop-blur-[10px] bg-[rgba(255,255,255,0.2)]   dark:bg-[rgba(255,255,255,0.05)]">
              {children}
            </div>
          </LayoutTransition>
        </div>
      </div>
    </>
  );
}
