import { ThemeProvider } from "next-themes";
import Button from "@/components/utils/Button";
import ThemeToggler from "@/components/ThemeToggler";
import { LayoutTransition } from "../../components/FramerLayout";
import Link from "@/components/Navigation";
import { getPathname } from "@/i18n/routing";
import { getLocale } from "next-intl/server";
import Navigation from "@/components/Navigation";
import Header from "@/components/Header";
import Image from "next/image";
import Preview from "@/components/Preview";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />

      <div className="flex items-center justify-between ">
        <div className="container relative flex flex-col items-center justify-between gap-10 mx-auto lg:flex-row lg:py-20 py-14 lg:gap-0 ">
          {/* Mobile Mockup Section */}

          <div className="lg:w-[30%] xl:w-[27%]   w-6/12 ">
            <div className="relative   ">
              <Image
                alt="photo frame"
                src={"/images/phone-frame.webp"}
                width={1000}
                height={1000}
              />
              <div className="absolute  top-0  bottom-0 right-0 m-auto  no-scrollbar left-0     overflow-scroll flex flex-col justify-start max-w-[87%] max-h-[90%] py-10 gap-4 items-center  ">
                <div>
                  <Image
                    alt="photo frame"
                    src={"/images/me.webp"}
                    width={800}
                    height={800}
                    className="object-cover object-center rounded-full w-24 h-24"
                  />
                </div>
                <div className=" font-semibold justify-center flex-col items-center gap-2 tracking-wider flex">
                  <h1 className="text-[1.3rem] opacity-80">@jimam_</h1>
                  <h1 className="text-[1.4rem]">Jimamt Tamimi</h1>
                </div>
                <p className="text-center mb-2 leading-loose max-w-[900px]">
                  hey this is jimam tamimi and this is my bio. How are you doing
                  today?
                  <span className="hidden">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore voluptate quod quae voluptatum officiis perferendis
                  </span>
                </p>
                {[
                  1, 2, 2,  
                ].map((_, i) => (
                  <div className="bg-black font-semibold tracking-wide cursor-pointer flex justify-between items-center p-6 hover:scale-[1.04] rounded-lg  w-[96%] max-w-[100%] active:scale-100 transition-all duration-300 ease-in-out">
                    <div className="flex text-lg gap-3 justify-center items-center">
                      <FaGithub size={27} />
                      <p>GitHub</p>
                    </div>
                    <FaArrowRightLong size={22} />
                  </div>
                ))}
              </div>
              {/* <div className="absolute top-0 left-0 flex flex-col items-center justify-center w-full h-full">
                <Image
                  alt="photo frame"
                  src={"/images/me.webp"}
                  width={800}
                  height={800}
                  className="object-cover object-center rounded-full w-14 h-14"
                />
                <h1>jimamt amimi</h1>
              </div> */}
            </div>
          </div>

          {/* Link Customization Section */}
          <LayoutTransition
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            mode="popLayout"
            className="  lg:w-8/12 xl:w-[67%]  w-full"

          >
            <div className="gap-8 flex flex-col justify-center  *:tracking-wide    rounded-lg px-8 py-10 dark:shadow-[0_0px_15px_#ffffff20]    shadow-[0_0px_15px_#00000010]  backdrop-blur-[5px]   bg-[rgba(255,255,255,0.05)]">
              {children}
            </div>
          </LayoutTransition>
        </div>
      </div>
    </>
  );
}
