"use client";

import { toast } from "sonner"; // Use Sonner's toast
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

// Correcting types
type ResponseType = InferResponseType<typeof api.document.create.$post>;
type RequestType = InferRequestType<typeof api.document.create.$post>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      // Making sure the correct API call is used and return type matches ResponseType
      const response = await api.document.create.$post({ json });
      return (await response.json()) as ResponseType;  // Correctly type the response
    },
    onSuccess: (response) => {
      console.log(response);
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      // Success toast with Sonner
      toast.success("Document created successfully.");
    },
    onError: () => {
      // Error toast with Sonner
      toast.error("Failed to create document. Please try again.");
    },
  });

  return mutation;
};

export default useCreateDocument;
