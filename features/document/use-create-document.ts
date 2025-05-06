import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType } from "hono";
import { api } from "@/lib/hono-rpc";

// Define the structure of the API response explicitly to avoid circular dependencies
type CreateDocumentResponse = {
  success: boolean;
  data: {
    id: string;
    title: string;
    createdAt: string;
  };
};

// Define the `DocumentAPI` type explicitly
type DocumentAPI = {
  create: {
    $post: (params: { json: RequestType }) => Promise<CreateDocumentResponse>; // Use explicit response type
  };
};

// Ensure `api` has the correct structure for `document`
const typedApi = api as unknown as { document: DocumentAPI };

// Define the request type explicitly or using inference
type RequestType = InferRequestType<typeof typedApi.document.create.$post>["json"];

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateDocumentResponse, Error, RequestType>({
    mutationFn: async (json) => {
      // Ensure the API call is correctly typed and functional
      const response = await typedApi.document.create.$post({ json });
      return response; // Return the typed response directly
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] }); // Invalidate cache
    },
    onError: () => {
      console.error("Failed to create document"); // Log error
    },
  });

  return mutation;
};

export default useCreateDocument;