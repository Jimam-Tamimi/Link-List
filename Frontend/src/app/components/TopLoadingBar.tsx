"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
  
export default function TopLoadingBar() {
  const pathname = usePathname();  
  const searchParams = useSearchParams();  
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!loading) {
      NProgress.start();
      setLoading(true);
    } else {
      NProgress.done();
      setLoading(false);
    }
  }, [pathname, searchParams]); // Re-run the effect on path or search param changes

  return null; 
}
