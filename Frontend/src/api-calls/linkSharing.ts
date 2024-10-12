import axios from "axios";
import api from "./api";
import NProgress from 'nprogress';

// types.ts
export interface LinkType {
  id?: number;
  uid?: string;
  profile: number;
  order?: number;
  platform: string;
  url: string;
  created_at?: string;
  updated_at?: string;
}

export const getLinksByUsername = async (
  username: string
): Promise<LinkType[]> => {
  try {
    const response = await axios.post("/links/get-links-for-username/", {
      username,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching links by username:", error);
    throw error;
  }
};

export const getLinksForMe = async (): Promise<LinkType[]> => {
  NProgress.inc();
  try {
    const response = await api.get("/links/get-links-for-me/");
    return response.data;
  } catch (error) {
    console.error("Error fetching links for me:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const createLink = async (linkData: LinkType): Promise<LinkType> => {
  NProgress.inc();
  try {
    const response = await api.post("/links/", linkData);
    return response.data;
  } catch (error) {
    console.error("Error creating link:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const updateOrder = async (newOrderedObject: {
  id: number;
  order: number;
}): Promise<LinkType> => {
  NProgress.inc();
  try {
    const response = await api.post(`/links/${newOrderedObject?.id}/update-order/`, {
      order: newOrderedObject?.order,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating order:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const updateLink = async (
  linkData: Partial<LinkType>,
  id: number
): Promise<LinkType> => {
  NProgress.inc();
  try {
    const response = await api.patch(`/links/${id}/`, linkData);
    return response.data;
  } catch (error) {
    console.error("Error updating link:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};

export const deleteLink = async (id: number): Promise<LinkType> => {
  NProgress.inc();
  try {
    const response = await api.delete(`/links/${id}/`);
    return response.data;
  } catch (error) {
    console.error("Error deleting link:", error);
    throw error;
  } finally {
    NProgress.done();
  }
};
