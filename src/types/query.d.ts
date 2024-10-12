import type { Product } from "@/types/data";

export type ProductsQueryParams = {
  categoryUrl?: string;
  categoryTypeUrl?: string;
  pageNum?: number;
  limit?: number;
};

export type ProductsApiResponse = {
  products: Product[];
  totalCount?: number;
  totalPages?: number;
};
