import Image from "next/image";
import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { FaArrowRightLong, FaGithub } from "react-icons/fa6";

export default function Preview({className}: {className?: string}) {
  return (
    <>
      <section className={` ${className} flex justify-center items-center z-50 `}>
        <div className="container flex flex-col justify-center gap-4  z-50 items-center py-10">
            <Image
              alt="photo frame"
              src={"/images/me.webp"}
              width={800}
              height={800}
              className="object-cover object-center rounded-full w-28 h-28"
            />
            <div className=" font-semibold justify-center flex-col items-center gap-3 tracking-wider flex">
              <h1 className="text-[1.8rem] opacity-80">@jimam_</h1>
              <h1 className="text-[1.9rem]">Jimamt Tamimi</h1>
            </div>
            <p className="text-center mb-5 leading-loose max-w-[900px]">hey this is jimam tamimi and this is my bio. How are you doing today?Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore voluptate quod quae voluptatum officiis perferendis</p>

            <div className="bg-black font-semibold tracking-wide cursor-pointer flex justify-between items-center p-6 hover:scale-[1.04] rounded-lg sm:w-[80%] w-[96%] max-w-[900px] active:scale-100 transition-all duration-300 ease-in-out">
              <div className="flex text-lg gap-3 justify-center items-center">
                <FaGithub  size={27}/>
                <p>GitHub</p>
              </div>
              <FaArrowRightLong size={22} />
            </div>

        </div>
      </section>
    </>
  );
}
