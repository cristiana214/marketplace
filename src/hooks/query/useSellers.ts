// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { SellersApiResponse } from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch categories data from API.
 * @returns Promise<SellersApiResponse> -  response from the API with categories data.
 */
const fetchSellers = async (): Promise<SellersApiResponse> => {
  // Returns a Promise of type SellersApiResponse
  const response: SellersApiResponse = await axios.get(`/api/sellers/`);
  console.log(response);
  return response;
};

/**
 * custom hook to fetch and manage the categories data using React Query.
 * @returns UseQueryResult<SellersApiResponse, Error> - React Query result containing either data or error.
 */
export const useSellers = () =>
  useQuery<SellersApiResponse, Error>({
    queryKey: ["sellers"], // unique key for caching the query result
    queryFn: () => fetchSellers(), // query function that fetches categories
  });
