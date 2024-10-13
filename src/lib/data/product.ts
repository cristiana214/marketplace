import type { ProductFarmer } from "@/types/data";

const productFarmer: ProductFarmer = {
  productId: 1,
  name: "Organic Heirloom Tomatoes",
  price: 4.99,
  unitDisplayName: "kl",
  url: "tomatoes-1",
  quantity: 100,
  typeId: 1,
  typeName: "Tomato",
  typeUrl: "tomato",
  categoryId: 1,
  categoryName: "Fruits",
  categoryUrl: "fruits",
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
    url: "nanay-nitz-fresh-veggies-farm",
    farmName: "Nanay Nitz Fresh Vegies Farm",
    image:
      "https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/327178826_842506286810064_8956730658938393487_n.png?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SzGJ24Z0opwQ7kNvgEccTne&_nc_ht=scontent.fmnl8-3.fna&_nc_gid=AY6NgxWMtCnxlic8Iu6ULGu&oh=00_AYB28eRXS89GEwfMFEMCr9JfTYrXDFZYL8iSx98KNlaQgQ&oe=66FFF3AD",
    bio: "Nanay Nitz has been growing organic produce for over 15 years. Her farm specializes in heirloom varieties and sustainable farming practices.",
    address: "sadasdas",
    phone: "2924",
    email: "",
    mapUrl: "",
    images: [],
    socialMedia: {
      facebook: "",
    },
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
