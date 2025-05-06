"use client";

import { toast } from "sonner";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

type ResponseType = InferResponseType<typeof api.document.create.$post>;
type RequestType = InferRequestType<typeof api.document.create.$post>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.document.create.$post({ json });
      return await response.json();
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      toast.success("Document created successfully", {
        description: response.success || "You can now edit your document.",
      });
    },
    onError: () => {
      toast.error("Failed to create document", {
        description: "Please try again later.",
      });
    },
  });

  return mutation;
};

export default useCreateDocument;
