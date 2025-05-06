"use client";

import { toast } from "sonner";
import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";

// Define the shape of the document data returned from the API
type DocumentData = {
  id: string;
  title: string;
  summary?: string | null;
  themeColor?: string;
  thumbnail?: string | null;
  currentPosition?: number;
  status?: "archived" | "private" | "public";
};

type ResponseType = {
  success: boolean;
  data?: DocumentData;
};

type RequestType = InferRequestType<typeof api.document.create.$post>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await api.document.create.$post({ json });
      const data = (await response.json()) as ResponseType;
      return data;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      toast.success("Document created successfully", {
        description: response.success
          ? "You can now edit your document."
          : "Document created, but status unknown.",
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
