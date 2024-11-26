// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference
import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type { OrdersApiResponse } from "@/types/query"; // importing types for query parameters and API response

/**
 * function to fetch categories data from API.
 * @returns Promise<SellersApiResponse> -  response from the API with categories data.
 */
const fetchOrders = async (): Promise<OrdersApiResponse> => {
  // Returns a Promise of type SellersApiResponse
  const response: OrdersApiResponse = await axios.get(`/api/orders/`);
  console.log(response);
  return response;
};

/**
 * custom hook to fetch and manage the categories data using React Query.
 * @returns UseQueryResult<SellersApiResponse, Error> - React Query result containing either data or error.
 */
export const useOrders = () =>
  useQuery<OrdersApiResponse, Error>({
    queryKey: ["orders"], // unique key for caching the query result
    queryFn: () => fetchOrders(), // query function that fetches categories
  });
