"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Link } from "@/i18n/routing";

const Navigation = ( {pageContent}:{pageContent:any}) => {
  const pathname = usePathname();
  const [underlineStyle, setUnderlineStyle] = useState({ left: 0, width: 0 });
  const linksRef = useRef<(HTMLAnchorElement | null)[]>([]);

  // Update the underline position and width based on the active link
  useEffect(() => {
    const activeIndex = linksRef.current.findIndex(
      (link) => link && link.href.includes(pathname)
    );
    
    if (activeIndex !== -1 && linksRef.current[activeIndex]) {
      const activeLink = linksRef.current[activeIndex];
      const { offsetLeft, clientWidth } = activeLink!;
      setUnderlineStyle({ left: offsetLeft - 4, width: clientWidth + 8 });
    }
  }, [pathname]);

  return (
    <nav style={{ position: "relative", display: "flex", }} className=" *:text-base *:md:text-lg *:font-semibold tracking-wide flex justify-center items-center  md:gap-12 gap-6 ">
      <Link
        href="/links"
        ref={(el) => {(linksRef.current[0] = el)}}
        style={{ textDecoration: "none",  }}
        className="hover:scale-105 transition-all duration-300 ease-in-out active:scale-90"
      >
        {pageContent?.nav_link_links}
      </Link>
      <Link
        href="/profile"
        ref={(el) => {(linksRef.current[1] = el)}}
        style={{ textDecoration: "none",  }}
        className="hover:scale-105 transition-all duration-300 ease-in-out active:scale-90"
      >
        {pageContent?.nav_link_profile}
        </Link>

      {/* Floating underline */}
      <motion.div
        style={{
          position: "absolute",
          bottom: "-5px", // Adjust as needed
          height: "2px", // Height of the underline
        }}
        className="bg-gradient-to-br from-[#415592] to-[#ff5a5a]  dark:from-[#a2b8ff] dark:to-[#ff4e9d] rounded-full"
        animate={underlineStyle}
        transition={{ duration: 0.25 }}
      />
    </nav>
  );
};

export default Navigation;
