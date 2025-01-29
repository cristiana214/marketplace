export type Category = {
  categoryId: number;
  categoryName: string;
  categoryUrl: string;
  categoryDescription?: string;
  items?: CategoryItem[]; // array of category items
};
type CategoryType = {
  typeId: number;
  typeName: string;
  typeUrl: string;
  typeDescription?: string;
  categoryName?: string;
  categoryUrl?: string;
};
export type User = {
  userId: number;
  name: string;
  username?: string;
  email: string;
  about: string;
  contact: number;
  displayName?: string;
  image: string;
  images: string[];
  location?: string;
};

// one product
export type Product = {
  productId: number;
  name: string;
  url: string;
  price: number;
  currentPrice?: number;
  unitDisplayName: string;
  quantity: number;
  description: string;
  imageUrl: string;
  images: string[];
  typeName: string;
  typeUrl: string;
} & Category &
  CategoryType;

export type ProductImage = {
  productId: number;
  imageUrl: string;
  name: string;
};

export type Products = Product[];

// export type Farmer = {
//   farmerId: number;
//   name: string;
//   farm: string;
//   image: string;
//   bio: string;
// };

export type Farmer = {
  farmerId: number;
  name: string;
  url: string;
  farmName: string;
  bio: string;
  image: string;
  images: string[];
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  socialMedia: {
    facebook: string;
  };
};

export type CategoryItem = {
  name: string;
  url: string;
};

type NutritionFacts = {
  servingSize: string;
  calories: number;
  totalFat: string;
  sodium: string;
  totalCarbohydrate: string;
  protein: string;
};

export type ProductFarmer = Product & {
  farmer: Farmer;
  nutritionFacts: NutritionFacts;
};

export type Harvest = {
  crop: string;
  date: string;
};

export type Event = {
  id: number;
  title: string;
  date: string;
  description: string;
};

export type BlogPost = {
  id: number;
  title: string;
  date: string;
  excerpt: string;
};

export type GalleryImage = {
  id: number;
  src: string;
  alt: string;
  category: "farm" | "product";
};
export type Order = {
  id: number;
  date: string;
  customerName: string;
  total: number;
  items: { name: string; quantity: number }[];
};

export type AddOrderProduct = {
  productId: number;
  name?: string;
  quantity: number;
  currentPrice: number;
};

// /api/orders_seller
export type OrderProduct = {
  sellerId: number | string; //  seller_id is a number or string
  userId: number; //  user_id is a number
  username: string; // username is a string
  orderId: number; //  order_id is a number
  messageForSeller: string | null; // message_for_seller is a string or null
  currentStatus: string; // current_status is a string or specific enum type
  address: string; //  address is a string
  totalAmount: number; //  total_amount is a number
  dateAdded: string; // date_added is a Date or string
  dateCompleted: string | null; //  date_completed is a Date, string, or null
  isCompleted: boolean; //  is_completed is a boolean
  productName: string; //  name is a string
  productId: number; //  product_id is a number
  totalQuantity: number; //  quantity is a number
  currentPrice: number; //  current_price is a number
  totalPrice: number; //  field based on quantity * current_price
};
export type OrderProducts = { orderProducts: AddOrderProduct[] };
