import type { CardData, Category } from "@/types/data";

const cardData: CardData[] = [
  {
    title: "Rice",
    url: "rice",
    description:
      "Premium quality rice harvested from the finest fields. Available in different varieties such as Jasmine, Sinandomeng, and Dinorado. Perfect for daily meals or special occasions, known for its fluffy texture and delicious taste.",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?resize=1200%2C630",
  },
  {
    title: "Coconut",
    url: "coconut",
    description:
      "Fresh coconuts, perfect for making coconut milk, oil, or coconut water. These coconuts are organically grown, and each one is handpicked to ensure quality. Ideal for both home consumption and commercial use.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
  },
  {
    title: "Banana (Cavendish)",
    url: "banana",
    description:
      "Top-grade Cavendish bananas, known for their sweet, firm texture and rich potassium content. Great for snacks, smoothies, or baking. Available in different sizes and packaging options for export and local markets.",
    imageUrl:
      "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  },
  {
    title: "Sweet Corn",
    url: "sweet-corn",
    description:
      "High-quality yellow and white corn, versatile for various uses: from human consumption to livestock feed. Ideal for corn meals, snacks, or flour production. Available in bulk or small quantities.",
    imageUrl:
      "https://www.allthatgrows.in/cdn/shop/articles/Optimized-Feat_image-Sweetcorn_1100x1100.jpg?v=1680067377",
  },
  {
    title: "Sugarcane",
    url: "sugarcane",
    description:
      "Fresh sugarcane, ideal for sugar production, molasses, or raw consumption. Harvested at peak sweetness, ensuring high sugar yield for industrial or artisanal processing.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgTGoqQ6dgpPwy_6e6MOovFw61H8KouS_Yg&s",
  },
  {
    title: "Mango (Carabao)",
    url: "mango",
    description:
      "Known for its distinct sweetness, Carabao mangoes are perfect for fresh consumption, desserts, or dried products. Available in bulk for both local and export markets. Each mango is handpicked to guarantee superior quality and ripeness.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/ripe-native-carabao-mangoes-known-600nw-2052644825.jpg",
  },
  {
    title: "Pineapple",
    url: "pineapple",
    description:
      "Sweet, juicy pineapples ideal for fresh consumption or canning, with a naturally vibrant flavor. Available in bulk for both domestic and international buyers. Perfect for salads, juices, or as a snack.",
    imageUrl: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
  },
];

const categories: Category[] = [
  {
    name: "Rice",
    url: "rice",
    items: [
      { name: "Corn Rice", url: "corn-rice" },
      { name: "Glutinous Rice", url: "glutinous-rice" },
    ],
  },
  {
    name: "Fruits",
    url: "fruits",
    items: [
      { name: "Marang", url: "marang" },
      { name: "Mangoes", url: "mangoes" },
      { name: "Bananas", url: "bananas" },
      { name: "Watermelon", url: "watermelon" },
      { name: "Papayas", url: "papayas" },
      { name: "Avocados", url: "avocados" },
    ],
  },
  {
    name: "Legumes",
    url: "legumes",
    items: [
      { name: "Mongo", url: "mongo-beans" },
      { name: "String Beans", url: "string-beans" },
    ],
  },
  {
    name: "Green Leafy Vegetables",
    url: "green-leafy-vegetables",
    items: [
      { name: "Alugbate", url: "alugbate" },
      { name: "Kangkong", url: "kangkong" },
      { name: "Lettuce", url: "lettuce" },
      { name: "Petchay", url: "petchay" },
      { name: "Camote tops", url: "camote-tops" },
      { name: "Chinese Kangkong", url: "chinese-kangkong" },
    ],
  },
  {
    name: "Livestocks",
    url: "livestocks",
    items: [
      { name: "Bisaya Chickens", url: "chickens" },
      { name: "45 days Chicken", url: "45days-chicken" },
      { name: "Pigs", url: "pigs" },
      { name: "Goats", url: "goats" },
    ],
  },
  {
    name: "Farm Tools",
    url: "farm-tools",
    items: [
      { name: "Hand Tracktor - rotavator", url: "rotavator" },
      { name: "Deep Plows", url: "deep-plows" },
      { name: "Plows", url: "deep-plows" },
      { name: "Spiral plow", url: "spiral plow" },
      { name: "Rakes", url: "rakes" },
      { name: "Grasscutter", url: "grasscutter" },
    ],
  },
  {
    name: "Vegetables",
    url: "vegetables",
    items: [
      { name: "Tomatoes", url: "tomatoes" },
      { name: "Cucumbers", url: "cucumbers" },
      { name: "Bell Peppers", url: "bell-peppers" },
      { name: "Eggplant", url: "eggplants" },
      { name: "Spring union", url: "spring-onions" },
    ],
  },
  {
    name: "Herbs and Spices",
    url: "herbs-and-spices",
    items: [
      { name: "Basil", url: "basil" },
      { name: "Mint", url: "mint" },
      { name: "Ginger", url: "ginger" },
      { name: "Lemon Grass", url: "lemon grass" },
    ],
  },
  {
    name: "Firewood",
    url: "firewood",
    items: [
      { name: "Hardwood", url: "hardwood" },
      { name: "Softwood", url: "softwood" },
      { name: "Charcoal", url: "charcoal" },
      { name: "Logs", url: "logs" },
    ],
  },
  {
    name: "Tubers and Roots",
    url: "tubers-and-roots",
    items: [
      { name: "Sweet Potatoes", url: "sweet-potatoes" },
      { name: "Yams", url: "yams" },
      { name: "Cassava", url: "cassava" },
      { name: "Taro/Gabi", url: "taro" },
      { name: "Ginger", url: "ginger" },
    ],
  },
];

export { cardData, categories };
