// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import type { CategoryApiResponse, CategoryQueryParams } from "@/types/query";

const fetchCategory = async (
  queryParams: CategoryQueryParams,
): Promise<CategoryApiResponse> => {
  // Returns a Promise of type CategoryApiResponse
  const response: CategoryApiResponse = await axios.get(`/api/category/`, {
    params: {
      categoryUrl: queryParams?.categoryUrl, // Category URL filter
    },
  });
  console.log(response);
  return response;
};

export const useCategory = (queryParams: CategoryQueryParams) =>
  useQuery<CategoryApiResponse, Error>({
    queryKey: ["category", queryParams], // unique key for caching the query result
    queryFn: () => fetchCategory(queryParams), // query function that fetches categories
  });
