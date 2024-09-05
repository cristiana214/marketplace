export type CardData = {
  title: string;
  url: string;
  description: string;
  imageUrl: string;
};

export type CategoryItem = {
  name: string;
  url: string;
};

export type Category = {
  name: string;
  url: string;
  items: CategoryItem[];
};
