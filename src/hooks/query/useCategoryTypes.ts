// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios";
import type {
  CategoryTypesApiResponse,
  CategoryTypesQueryParams,
} from "@/types/query";

const fetchCategoryTypes = async (
  queryParams: CategoryTypesQueryParams,
): Promise<CategoryTypesApiResponse> => {
  const response: CategoryTypesApiResponse = await axios.get(
    `/api/category_types/`,
    {
      params: {
        categoryUrl: queryParams?.categoryUrl, // Category URL filter
      },
    },
  );
  console.log(response);
  return response;
};

/**
 * custom hook to fetch and manage the categories types data using React Query.
 */
export const useCategoryTypes = (queryParams: CategoryTypesQueryParams) =>
  useQuery<CategoryTypesApiResponse, Error>({
    queryKey: ["categoryTypes", queryParams],
    queryFn: () => fetchCategoryTypes(queryParams), // query function that fetches categories
  });
