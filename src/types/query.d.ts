import type { Product, Category, CategoryType, User } from "@/types/data";
// QueryParams
export type ProductsQueryParams = {
  categoryUrl?: string;
  categoryTypeUrl?: string;
  userUrl?: string; // sellerUrl
  pageNum?: number;
  limit?: number;
};
export type ProductQueryParams = {
  productId?: string;
};
export type SellerQueryParams = {
  userUrl?: string;
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
  product: Product;
};
export type SellerApiResponse = {
  user: User;
};

// product: Product & { seller: User };
