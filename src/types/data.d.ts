// one product
export type Product = {
  title: string;
  url: string;
  description: string;
  imageUrl: string;
};
// array of product
export type Products = Product[];

export type CategoryItem = {
  name: string;
  url: string;
};

export type Category = {
  name: string;
  url: string;
  items: CategoryItem[]; // array of category items
};
