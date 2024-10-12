// one product
export type Product = {
  productId: number;
  name: string;
  url: string;
  price: number;
  unitDisplayName: string;
  quantity: number;
  description: string;
  imageUrl: string;
  images: string[];
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
