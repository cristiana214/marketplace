// one product
export type Product = {
  productId?: number;
  title: string;
  url: string;
  price: number;
  unit: string;
  description: string;
  imageUrl: string;
  images?: string[];
};

// export type Farmer = {
//   farmerId: number;
//   name: string;
//   farm: string;
//   image: string;
//   bio: string;
// };

interface Farmer {
  farmerId: number;
  name: string;
  farmName: string;
  bio: string;
  image: string;
  address: string;
  phone: string;
  email: string;
  mapUrl: string;
  socialMedia: {
    facebook: string;
  };
}

export type CategoryItem = {
  name: string;
  url: string;
};

export type Category = {
  name: string;
  url: string;
  items: CategoryItem[]; // array of category items
};

type NutritionFacts = {
  servingSize: string;
  calories: number;
  totalFat: string;
  sodium: string;
  totalCarbohydrate: string;
  protein: string;
};

// array of product
export type Products = Product[];

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
