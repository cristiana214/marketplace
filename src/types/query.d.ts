import type { Products } from "@/types/data";

export type ProductsQueryParams = {
  categoryUrl?: string;
  categoryTypeUrl?: string;
  pageNum?: number;
  limit?: number;
};

export type ProductsApiResponse = Products & {
  totalCount?: number;
  totalPages?: number;
};