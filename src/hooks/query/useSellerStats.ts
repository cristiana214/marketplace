// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type {
  SellerStatsApiResponse,
  SellerStatsQueryParams,
} from "@/types/query"; // importing types for query parameters and API response

const fetchSellerStats = async (
  queryParams: SellerStatsQueryParams, // accepts query parameters of type ProductsQueryParams
): Promise<SellerStatsApiResponse> => {
  const response: SellerStatsApiResponse = await axios.get(
    `/api/stats/seller/`,
    {
      // axios GET request to fetch stats
      params: {
        userId: queryParams?.userId, // userId filter
      },
    },
  );
  return response;
};

export const useSellerStats = (queryParams: SellerStatsQueryParams) =>
  useQuery<SellerStatsApiResponse, Error>({
    queryKey: ["sellerStats", queryParams], // unique key for caching the query result
    queryFn: () => fetchSellerStats(queryParams), // query function that fetches stats based on queryParams
  });
