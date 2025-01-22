// https://tanstack.com/query/v5/docs/framework/react/typescript#type-inference

import { useQuery } from "@tanstack/react-query";
import { axios } from "@/lib/axios"; // custom axios instance
import type {
  AdminStatsApiResponse,
  SellerStatsQueryParams,
} from "@/types/query"; // importing types for query parameters and API response

const fetchAdminStats = async (
  queryParams: SellerStatsQueryParams, // accepts query parameters of type ProductsQueryParams
): Promise<AdminStatsApiResponse> => {
  const response: AdminStatsApiResponse = await axios.get(`/api/stats/admin/`, {
    // axios GET request to fetch stats
    params: {
      userId: queryParams?.userId, // userId filter
    },
  });
  return response;
};

export const useAdminStats = (queryParams: SellerStatsQueryParams) =>
  useQuery<AdminStatsApiResponse, Error>({
    queryKey: ["adminStats", queryParams], // unique key for caching the query result
    queryFn: () => fetchAdminStats(queryParams), // query function that fetches stats based on queryParams
  });
