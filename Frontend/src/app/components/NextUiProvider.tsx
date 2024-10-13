// app/providers.tsx
"use client";

import { NextUIProvider as Provider } from "@nextui-org/system";
import { useTheme } from "next-themes";
import { SkeletonTheme } from "react-loading-skeleton";

export function NextUIProvider({ children }: { children: React.ReactNode }) {
  const {resolvedTheme} = useTheme()
  return (
    <Provider >
      <SkeletonTheme  baseColor={`${resolvedTheme=='dark'? "#3a2d46" : '#e5ecff'} `}  highlightColor={`${resolvedTheme=='dark'? "#4e3f5c" : '#ccd9ff'} `}>
        {children}
      </SkeletonTheme>
    </Provider>
  );
}
