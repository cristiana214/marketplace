// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { OrdersApiResponse, OrdersQueryParams } from "@/types/query";
// importing types for query parameters and API response
const getApiEndpoint = (queryParams: OrdersQueryParams) =>
  queryParams?.userUrl ? "/api/orders_user/" : "/api/orders_seller/";
const fetchOrders = async (
  queryParams: OrdersQueryParams,
): Promise<OrdersApiResponse> => {
  const URL = await getApiEndpoint(queryParams);

  const response: OrdersApiResponse = await axios.get(URL, {
    // axios GET request to fetch products
    params: {
      sellerId: queryParams?.sellerId, // userUrl filter
      userUrl: queryParams?.userUrl, // userId filter
      pageNum: queryParams?.pageNum, // Page number for pagination
      limit: queryParams?.limit, // Limit of results per page
      status: queryParams?.status, // Limit of results per page
    },
  });
  return response;
};

/**
 * custom hook to fetch and manage the categories data using React Query.
 * @returns UseQueryResult<SellersApiResponse, Error> - React Query result containing either data or error.
 */
export const useOrders = (queryParams: OrdersQueryParams) =>
  useQuery<OrdersApiResponse, Error>({
    queryKey: ["orders", queryParams], // unique key for caching the query result
    queryFn: () => fetchOrders(queryParams), // query function that fetches categories
  });
