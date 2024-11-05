// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference

// import necessary dependencies from React Query and custom modules
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { ProductsQueryParams, ProductsApiResponse } from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch products data from API.
 * query parameters (such as categoryUrl, pageNum, etc.) as input and
 * returns a promise that resolves to products API response.
 *
 * @param queryParams -  parameters to be used in the query (e.g., categoryUrl, limit
 * @returns Promise<ProductsApiResponse> -  response from the API with products data.
 */
const fetchProducts = async (
  queryParams: ProductsQueryParams, // accepts query parameters of type ProductsQueryParams
): Promise<ProductsApiResponse> => {
  // Returns a Promise of type ProductsApiResponse
  const response: ProductsApiResponse = await axios.get(`/api/products/`, {
    // axios GET request to fetch products
    params: {
      categoryUrl: queryParams?.categoryUrl, // Category URL filter
      categoryTypeUrl: queryParams?.categoryTypeUrl, // Category type URL filter
      userUrl: queryParams?.userUrl, // userUrl filter

      pageNum: queryParams?.pageNum, // Page number for pagination
      limit: queryParams?.limit, // Limit of results per page
    },
  });
  return response;
};

/**
 * custom hook to fetch and manage the products data using React Query.
 * @param queryParams - query parameters (e.g., categoryUrl, pageNum) passed to the fetch function.
 * @returns UseQueryResult<ProductsApiResponse, Error> - React Query result containing either data or error.
 */
export const useProducts = (queryParams: ProductsQueryParams) =>
  useQuery<ProductsApiResponse, Error>({
    queryKey: ["products", queryParams], // unique key for caching the query result
    queryFn: () => fetchProducts(queryParams), // query function that fetches products based on queryParams
  });
