import {
  createLink,
  deleteLink,
  getLinksByUsername,
  getLinksForMe,
  LinkType,
  updateLink,
  updateOrder,
} from "@/api-calls/linkSharing";
import { RootState } from "@/redux/store";
import {
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useSelector } from "react-redux";
import NProgress from "nprogress";

const initial_my_links_data = [
  {
    id: 304,
    platform: "linkedin",
    url: "https://www.linkedin.com/in/jimam-tamimi-6b5a72324/",
    created_at: "2024-10-12T22:11:30.189746Z",
    updated_at: "2024-10-12T22:13:24.475315Z",
    order: 13,
    profile: 1,
  },
  {
    id: 305,
    platform: "github",
    url: "https://github.com/Jimam-Tamimi",
    created_at: "2024-10-12T22:12:07.029148Z",
    updated_at: "2024-10-12T22:13:24.475315Z",
    order: 12,
    profile: 1,
  },
  {
    id: 302,
    platform: "youtube",
    url: "https://www.youtube.com/@Jimam",
    created_at: "2024-10-12T22:10:29.405330Z",
    updated_at: "2024-10-12T22:13:32.834639Z",
    order: 11,
    profile: 1,
  },
  {
    id: 306,
    platform: "other",
    url: "https://jimam.vercel.app/",
    created_at: "2024-10-12T22:12:26.117954Z",
    updated_at: "2024-10-12T22:13:32.834639Z",
    order: 10,
    profile: 1,
  },
];

export const useLinksByUsername = (username: string) => {
  return useQuery({
    queryKey: ["links", username],
    queryFn: () => getLinksByUsername(username),
  });
};

export const useLinksForMe = () => {
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  return useQuery({
    queryKey: ["links", username],
    queryFn: () => getLinksForMe(),
    enabled: !!username,
    staleTime: 1000 * 60 * 10,
    initialDataUpdatedAt: 1,
    initialData: auth?.access ? [] :  initial_my_links_data  ,
  });
};

export const useUpdateLinkOrder = () => {
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (newOrderedObject: any) => {
      if (!username) {
        return () => newOrderedObject;
      }
      return updateOrder(newOrderedObject);
    },
    onSuccess: (data, variables, context) => {

      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        return oldData.map((link) => {
          if (link.id === data.id) {
            return data;
          }
          return link;
        });
      });
    },
  });
};
export const useCreateLink = () => {
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (data: any) => {
      if (!username) {
        return data;
      }
      return createLink(data);
    },
    onSuccess: (newData) => {
      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        ``;
        return [newData, ...oldData];
      });
    },
  });
};

export const useUpdateLink = (id: number | null | undefined) => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  if (!id || !username) {
    return;
  }
  return useMutation({
    mutationFn: async (data: Partial<LinkType>) => updateLink(data, id),
    onSuccess: (newData) => {
      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        return oldData.map((link) => {
          if (link.id === id) {
            return newData;
          }
          return link;
        });
      });
    },
  });
};

export const useDeleteLink = (id: number | null | undefined) => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  if (!id || !username) {
    return;
  }
  return useMutation({
    mutationFn: () => deleteLink(id),
    onSuccess: () => {
      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        return oldData.filter((link) => link.id !== id);
      });
    },
  });
};
