import type { Product, Category, CategoryType } from "@/types/data";
// QueryParams
export type ProductsQueryParams = {
  categoryUrl?: string;
  categoryTypeUrl?: string;
  pageNum?: number;
  limit?: number;
};
export type ProductQueryParams = {
  productId: number;
};
export type CategoryTypesQueryParams = {
  categoryUrl?: string;
};

// ApiResponse
export type ProductsApiResponse = {
  products: Product[];
  totalCount?: number;
  totalPages?: number;
};

export type CategoryTypesApiResponse = {
  categoryTypes: CategoryType[];
};
export type CategoriesApiResponse = {
  categories: Category[];
};
export type ProductApiResponse = {
  product: Product & { seller: User };
};

// product: Product & { seller: User };
