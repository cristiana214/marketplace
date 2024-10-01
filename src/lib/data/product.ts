import type { ProductFarmer } from "@/types/data";

const productFarmer: ProductFarmer = {
  productId: 1,
  title: "Organic Heirloom Tomatoes",
  price: 4.99,
  unit: "kl",
  url: "tomatoes-1",
  imageUrl:
    "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
  description:
    "Delicious, locally grown organic heirloom tomatoes. Perfect for salads, sandwiches, or cooking.",
  images: [
    "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
    "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?resize=1200%2C630",
    "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  ],
  farmer: {
    farmerId: 1,
    name: "Nanay Nitz",
    farm: "Nanay Nitz Fresh Vegies Farm",
    image:
      "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
    bio: "Nanay Nitz has been growing organic produce for over 15 years. Her farm specializes in heirloom varieties and sustainable farming practices.",
  },
  nutritionFacts: {
    servingSize: "1 medium tomato (123g)",
    calories: 22,
    totalFat: "0.2g",
    sodium: "6mg",
    totalCarbohydrate: "4.8g",
    protein: "1.1g",
  },
};

export { productFarmer };
