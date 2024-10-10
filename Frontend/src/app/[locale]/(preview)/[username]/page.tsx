import Preview from '@/components/Preview'
import React from 'react'

export default function page({ params }: { params: { locale: string, username:string  } }) {

  
  return (
    <>
    
    <Preview username={params?.username} />
    
    
    </>
  )
}
