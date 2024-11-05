// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import type {
  CategoryTypeApiResponse,
  CategoryTypeQueryParams,
} from "@/types/query";

const fetchCategoryType = async (
  queryParams: CategoryTypeQueryParams,
): Promise<CategoryTypeApiResponse> => {
  // Returns a Promise of type CategoryTypeApiResponse
  const response: CategoryTypeApiResponse = await axios.get(
    `/api/category_type/`,
    {
      params: {
        categoryTypeUrl: queryParams?.categoryTypeUrl, // Category type URL filter
      },
    },
  );
  console.log(response);
  return response;
};

export const useCategoryType = (queryParams: CategoryTypeQueryParams) =>
  useQuery<CategoryTypeApiResponse, Error>({
    queryKey: ["categoryType", queryParams], // unique key for caching the query result
    queryFn: () => fetchCategoryType(queryParams), // query function that fetches categoryType
  });
