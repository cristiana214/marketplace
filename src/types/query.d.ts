/* eslint-disable import/no-self-import */
import type {
  Product,
  Category,
  CategoryType,
  ProductImage,
  User,
} from "@/types/data";

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
export type ProductImagesQueryParams = {
  userUrl?: string;
};
export type SellerStatsQueryParams = {
  userId: number;
};
export type SellerQueryParams = {
  userUrl?: string;
};
export type SellersQueryParams = {
  userUrl?: string;
};
export type CategoryTypesQueryParams = {
  categoryUrl?: string;
};
export type CategoryQueryParams = {
  categoryUrl?: string;
};
export type CategoryTypeQueryParams = {
  categoryTypeUrl?: string;
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
export type CategoryApiResponse = {
  category: Category;
};
export type CategoryTypeApiResponse = {
  categoryType: CategoryType;
};
export type ProductApiResponse = {
  product: Product & { seller: User };
};
export type SellerApiResponse = {
  user: User;
};

export type SellersApiResponse = {
  users: User[];
};
export type ProductImagesApiResponse = {
  productImages: ProductImage[];
};
export type SellerStatsApiResponse = {
  stats: {
    totalSumOrders: number;
    totalCountOrders: number;
    totalSales: number;
    totalProducts: number;
  };
};
export type AdminStatsApiResponse = {
  stats: {
    totalUserSignups: number;
    totalSellers: number;
    totalUsers: number;
    totalProducts: number;
    totalOrders: number;
    totalCountOrders: number;
    totalSales: number;
  };
};
export type OrdersApiResponse = {
  orders: OrderProduct;
};
// product: Product & { seller: User };
export type OrdersQueryParams = {
  sellerId?: number;
  userUrl?: string;
  pageNum?: number;
  limit?: number;
  status?: "all" | "completed" | "inprogress";
};
