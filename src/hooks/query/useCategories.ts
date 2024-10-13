// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { CategoriesApiResponse } from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch categories data from API.
 * @returns Promise<CategoriesApiResponse> -  response from the API with categories data.
 */
const fetchCategories = async (): Promise<CategoriesApiResponse> => {
  // Returns a Promise of type CategoriesApiResponse
  const response: CategoriesApiResponse = await axios.get(`/api/categories/`);
  console.log(response);
  return response;
};

/**
 * custom hook to fetch and manage the categories data using React Query.
 * @returns UseQueryResult<CategoriesApiResponse, Error> - React Query result containing either data or error.
 */
export const useCategories = () =>
  useQuery<CategoriesApiResponse, Error>({
    queryKey: ["categories"], // unique key for caching the query result
    queryFn: () => fetchCategories(), // query function that fetches categories
  });
