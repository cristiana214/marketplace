// import necessary dependencies from React Query and custom modules
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type {
  ProductQueryParams,
  ProductApiResponse,
  ProductsQueryParams, // Make sure this is the correct type
} from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch products data from API.
 * query parameters (such as categoryUrl, pageNum, etc.) as input and
 * returns a promise that resolves to products API response.
 *
 * @param queryParams -  parameters to be used in the query (e.g., categoryUrl, limit
 * @returns Promise<ProductApiResponse> -  response from the API with products data.
 */
const fetchProduct = async (
  queryParams: ProductQueryParams, // accepts query parameters of type ProductQueryParams
): Promise<ProductApiResponse> => {
  // Ensure return type is ProductApiResponse
  const response = await axios.get(`/api/product/`, {
    // axios GET request to fetch products
    params: {
      productId: queryParams?.productId, // productId filter
    },
  });
  console.log(response);
  return response;
  // Make sure you're returning data, not the whole response object
};

/**
 * custom hook to fetch and manage the products data using React Query.
 * @param queryParams - query parameters (e.g., categoryUrl, pageNum) passed to the fetch function.
 * @returns UseQueryResult<ProductsApiResponse, Error> - React Query result containing either data or error.
 */
export const useProduct = (queryParams: ProductQueryParams) =>
  useQuery<ProductApiResponse, Error>({
    queryKey: ["product", queryParams], // unique key for caching the query result
    queryFn: () => fetchProduct(queryParams), // query function that fetches products based on queryParams
  });
