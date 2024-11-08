// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference

// import necessary dependencies from React Query and custom modules
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type {
  ProductImagesApiResponse,
  ProductImagesQueryParams,
} from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch products data from API.
 * query parameters (such as categoryUrl, pageNum, etc.) as input and
 * returns a promise that resolves to products API response.
 *
 * @param queryParams -  parameters to be used in the query (e.g., categoryUrl, limit
 * @returns Promise<ProductsApiResponse> -  response from the API with products data.
 */
const fetchSellerGallery = async (
  queryParams: ProductImagesQueryParams, // accepts query parameters of type ProductsQueryParams
): Promise<ProductImagesApiResponse> => {
  // Returns a Promise of type ProductsApiResponse
  const response: ProductImagesApiResponse = await axios.get(
    `/api/product_images/`,
    {
      // axios GET request to fetch products
      params: {
        userUrl: queryParams?.userUrl, // userUrl filter
      },
    },
  );
  return response;
};

/**
 * custom hook to fetch and manage the products data using React Query.
 * @param queryParams - query parameters (e.g., userUrl) passed to the fetch function.
 * @returns UseQueryResult<ProductsApiResponse, Error> - React Query result containing either data or error.
 */
export const useSellerGallery = (queryParams: ProductImagesQueryParams) =>
  useQuery<ProductImagesApiResponse, Error>({
    queryKey: ["productImages", queryParams], // unique key for caching the query result
    queryFn: () => fetchSellerGallery(queryParams), // query function that fetches products based on queryParams
  });
