"use client"
import { useTheme } from 'next-themes'
import React from 'react'
import { HashLoader } from 'react-spinners'

export default function PreLoader() {
  const {resolvedTheme} = useTheme()
  return (
    <>

    <HashLoader className='animate-scale   drop-shadow-[0px_0px_10px_black) filter-[drop-shadow(0px_0px_10px_black)] ' color={resolvedTheme == 'dark'? "#ff0040":  "#2563eb"} style={{filter: `drop-shadow(0px 0px 10px ${resolvedTheme=='dark'? 'black' : "#00000060"})`}} size={200}  />

    
    </>
  )
}
