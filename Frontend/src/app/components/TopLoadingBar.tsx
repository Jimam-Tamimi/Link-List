// components/TopLoadingBar.tsx (Client Component)
"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";

NProgress.configure({ showSpinner: false }); // Disable the spinner if you don't want it

export default function TopLoadingBar() {
  const pathname = usePathname(); // This tracks path changes in the App Router
  const searchParams = useSearchParams(); // This tracks search param changes
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Every time the pathname or searchParams change, we trigger NProgress
    if (!loading) {
      NProgress.start();
      setLoading(true);
    } else {
      NProgress.done();
      setLoading(false);
    }
  }, [pathname, searchParams]); // Re-run the effect on path or search param changes

  return null; // This component doesn't need to return anything visible
}
