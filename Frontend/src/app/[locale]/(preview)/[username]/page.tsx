import { ProfileType } from '@/api-calls/auth';
import { LinkType } from '@/api-calls/linkSharing';
import Preview from '@/components/Preview'
import axios from 'axios';
import { Metadata } from 'next';
import React, { cache } from 'react'

export const getProfileByUsername = cache( async (username:string) : Promise<ProfileType>  => {
  const profileResponse = await  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/profiles/get-profile-by-username/`, { username });
  return profileResponse.data;
})

export async function generateMetadata({ params }: any): Promise<Metadata> {

  let profile: (ProfileType | null) = null;
  try {
    profile = await  getProfileByUsername(params.username)

  } catch (error: any) {

  }
  return {
    title: (profile?.first_name  +  profile?.last_name ) as any,
    description: `Profile for user ${profile?.username} | ${profile?.bio}`,
    
  };
}

export default async function page({ params }: { params: { locale: string, username:string  } }) {
  const profile = await getProfileByUsername(params?.username)
  const response = await  axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/links/get-links-for-username/`, { username: params?.username });
  const links : LinkType[] = response.data;
  
  return (
    <>
    
    <Preview profile={profile} links={links}   />
    
    
    </>
  )
}
