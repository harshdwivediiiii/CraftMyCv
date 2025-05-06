"use client";

import { api } from "@/lib/hono-rpc";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

// Explicitly define the response type to avoid circular references
type UpdateDocumentResponse = {
  success: boolean;
  data: {
    id: string;
    title: string;
    updatedAt: string;
  };
};

// Explicitly define the request type to avoid inference issues
type UpdateDocumentRequest = {
  title?: string;
  summary?: string | null;
  themeColor?: string;
  thumbnail?: string | null;
  status?: "archived" | "active" | "draft";
};

// Define the `DocumentAPI` type explicitly
type DocumentAPI = {
  update: {
    [":documentId"]: {
      $patch: (params: {
        param: { documentId: string };
        json: UpdateDocumentRequest;
      }) => Promise<UpdateDocumentResponse>;
    };
  };
};

// Ensure `api` has the correct structure for `document.update`
const typedApi = api as unknown as { document: DocumentAPI };

const useUpdateDocument = () => {
  const param = useParams();
  const queryClient = useQueryClient();

  const documentId = param.documentId as string;

  const mutation = useMutation<UpdateDocumentResponse, Error, UpdateDocumentRequest>({
    mutationFn: async (json) => {
      const response = await typedApi.document.update[":documentId"]["$patch"]({
        param: {
          documentId: documentId,
        },
        json,
      });
      return response; // Directly return the typed response
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["document", documentId], // Refresh the cached query for this document
      });
    },
    onError: () => {
      toast.error("Failed to update document"); // Notify the user of the error
    },
  });

  return mutation;
};

export default useUpdateDocument;
