"use client";

import { InferRequestType} from "hono";
import { api } from "@/lib/hono-rpc";
import { toast } from "sonner"; // Correct toast import
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Infer the correct types for request and response
type ResponseType = {
  message: string;
};

type RequestType = InferRequestType<
  typeof api.document.retore.archive.$patch
>["json"];

const useRestoreDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.document.retore.archive.$patch({ json });
      return await response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["trashDocuments"] });
      queryClient.invalidateQueries({ queryKey: ["documents"] });
      queryClient.invalidateQueries({ queryKey: ["document"] });

      toast.success("Document restored successfully", {
        description: response.message || "It is now available in your documents list.",
      });
    },
    onError: () => {
      toast.error("Failed to restore document", {
        description: "Please try again later.",
      });
    },
  });

  return mutation;
};

export default useRestoreDocument;
