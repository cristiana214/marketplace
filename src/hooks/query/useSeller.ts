// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference

// import necessary dependencies from React Query and custom modules
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { SellerQueryParams, SellerApiResponse } from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch products data from API.
 * query parameters (such as categoryUrl, pageNum, etc.) as input and
 * returns a promise that resolves to products API response.
 *
 * @param queryParams -  parameters to be used in the query (e.g., categoryUrl, limit
 * @returns Promise<SellerApiResponse> -  response from the API with products data.
 */
const fetchSeller = async (
  queryParams: SellerQueryParams, // accepts query parameters of type SellerQueryParams
): Promise<SellerApiResponse> => {
  // Returns a Promise of type SellerApiResponse
  const response: SellerApiResponse = await axios.get(`/api/seller/`, {
    // axios GET request to fetch user
    params: {
      userUrl: queryParams?.userUrl, // userUrl filter
    },
  });
  return response;
};

/**
 * custom hook to fetch and manage the products data using React Query.
 * @param queryParams - query parameters (e.g., categoryUrl, pageNum) passed to the fetch function.
 * @returns UseQueryResult<SellerApiResponse, Error> - React Query result containing either data or error.
 */
export const useSeller = (queryParams: SellerQueryParams) =>
  useQuery<SellerApiResponse, Error>({
    queryKey: ["seller", queryParams], // unique key for caching the query result
    queryFn: () => fetchSeller(queryParams), // query function that fetches seller user based on queryParams
  });
