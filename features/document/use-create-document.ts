import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/hono-rpc";

// Define the structure of the API response explicitly
type CreateDocumentResponse = {
  success: boolean;
  data: {
    id: string;
    title: string;
    createdAt: string;
  };
};

// Define the request type
type RequestType = {
  title: string;
};

// Define the `DocumentAPI` type explicitly
type DocumentAPI = {
  create: {
    $post: (params: { json: RequestType }) => Promise<CreateDocumentResponse>;
  };
};

// Explicitly type the `api` object
const typedApi = api as unknown as { document: DocumentAPI };

const useCreateDocument = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<CreateDocumentResponse, Error, RequestType>({
    mutationFn: async (json) => {
      const response = await typedApi.document.create.$post({ json });
      return response;
    },
    onSuccess: (data) => {
      // Update the cache manually
      queryClient.setQueryData(["documents"], (oldData: CreateDocumentResponse['data'][] | undefined) => {
        const documents = Array.isArray(oldData) ? oldData : [];
        return [...documents, data.data];
      });
      // Invalidate for freshness
      queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
    onError: (error) => {
      console.error("Failed to create document:", error.message);
    },
  });

  return mutation;
};

export default useCreateDocument;