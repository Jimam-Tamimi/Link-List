import {
  createLink,
  deleteLink,
  getLinksByUsername,
  getLinksForMe,
  LinkType,
  updateLink,
} from "@/api-calls/linkSharing";
import { RootState } from "@/redux/store";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSelector } from "react-redux";

export const useLinksByUsername = (username: string) => {
  return useQuery({
    queryKey: ["links", username],
    queryFn: () => getLinksByUsername(username),
    enabled: !!username,
  });
};

export const useLinksForMe = () => {
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  return useQuery({
    queryKey: ["links", username],
    queryFn: () => getLinksForMe(),
    enabled: !!username,
  });
};

export const useCreateLink = () => {
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLink,
    onSuccess: (newData) => {
      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        ``;
        return [newData, ...oldData.slice(1)];
      });
    },
  });
};

export const useUpdateLink = (id: number | null | undefined) => {
  const queryClient = useQueryClient();
  const auth = useSelector((state: RootState) => state.auth?.data);
  const username = auth?.profile?.username || "";
  if (!id) {
    return;
  }
  return useMutation({
    mutationFn: async (data: Partial<LinkType>) => updateLink(data, id),
    onSuccess: (newData) => {
      queryClient.setQueryData(["links", username], (oldData: LinkType[]) => {
        if (!oldData) return;
        ``;
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
  if (!id) {
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