
import axios from 'axios';
import api from './api';


// types.ts
export interface LinkType {
  id?: number;
  uid?: string;
  profile: number;
  platform: string;
  url: string; 
  created_at?: string;
  updated_at?: string;
}



export const getLinksByUsername = async (username: string): Promise<LinkType[]> => {
  const response = await axios.post('/links/get-links-for-username/', { username });
  return response.data;
};


export const getLinksForMe = async (): Promise<LinkType[]> => {
    const response = await api.get('/links/get-links-for-me/');
    return response.data;
  };

export const createLink = async (linkData: LinkType):  Promise<LinkType> => {
  const response = await api.post('/links/', linkData);
  return response.data;
};

export const updateLink = async (linkData: Partial<LinkType>, id:number):  Promise<LinkType> => {
  const response = await api.patch(`/links/${id}/`, linkData);
  return response.data;
};

export const deleteLink = async ( id:number):  Promise<LinkType> => {
  const response = await api.delete(`/links/${id}/`);
  return response.data;
};