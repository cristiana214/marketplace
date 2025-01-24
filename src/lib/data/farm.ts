import type {
  Products,
  Product,
  Category,
  CategoryItem,
  Harvest,
  Order,
  BlogPost,
  GalleryImage,
  Farmer,
} from "@/types/data";

const images = [
  "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
  "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?resize=1200%2C630",
  "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
];

const extraInfo = {
  typeName: "Fruits",
  typeUrl: "fruits",
  categoryId: 1,
  typeId: 1,
  categoryName: "Fruits",
  categoryUrl: "dfsdf",
};

const products: Products = [
  {
    productId: 1,
    name: "Rice",
    url: "rice",
    description:
      "Premiums quality rice harvested from the finest fields. Available in different varieties such as Jasmine, Sinandomeng, and Dinorado. Perfect for daily meals or special occasions, known for its fluffy texture and delicious taste.",
    imageUrl:
      "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?resize=1200%2C630",
    price: 78,
    quantity: 24,
    unitDisplayName: "kl",

    images,
    ...extraInfo,
  },
  {
    productId: 2,
    name: "Coconut",
    url: "coconut",
    description:
      "Fresh coconuts, perfect for making coconut milk, oil, or coconut water. These coconuts are organically grown, and each one is handpicked to ensure quality. Ideal for both home consumption and commercial use.",
    imageUrl:
      "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
    price: 345,
    quantity: 24,
    unitDisplayName: "kl",
    images,
    ...extraInfo,
  },
  {
    productId: 3,
    name: "Bananas (Cavendish)",
    url: "bananas",
    description:
      "Top-grade Cavendish bananas, known for their sweet, firm texture and rich potassium content. Great for snacks, smoothies, or baking. Available in different sizes and packaging options for export and local markets.",
    imageUrl:
      "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    price: 23,
    quantity: 24,
    unitDisplayName: "kl",
    images,
    ...extraInfo,
  },
  {
    productId: 4,
    name: "Sweet Corn",
    url: "sweet-corn",
    description:
      "High-quality yellow and white corn, versatile for various uses: from human consumption to livestock feed. Ideal for corn meals, snacks, or flour production. Available in bulk or small quantities.",
    imageUrl:
      "https://www.allthatgrows.in/cdn/shop/articles/Optimized-Feat_image-Sweetcorn_1100x1100.jpg?v=1680067377",
    price: 23,
    quantity: 24,
    unitDisplayName: "kl",
    images,
    ...extraInfo,
  },
  {
    productId: 5,
    name: "Sugarcane",
    url: "sugarcane",
    description:
      "Fresh sugarcane, ideal for sugar production, molasses, or raw consumption. Harvested at peak sweetness, ensuring high sugar yield for industrial or artisanal processing.",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSTgTGoqQ6dgpPwy_6e6MOovFw61H8KouS_Yg&s",
    price: 23,
    quantity: 24,
    unitDisplayName: "kl",
    images,
    ...extraInfo,
  },
  {
    productId: 6,
    name: "Mango (Carabao)",
    url: "mango",
    description:
      "Known for its distinct sweetness, Carabao mangoes are perfect for fresh consumption, desserts, or dried products. Available in bulk for both local and export markets. Each mango is handpicked to guarantee superior quality and ripeness.",
    imageUrl:
      "https://www.shutterstock.com/image-photo/ripe-native-carabao-mangoes-known-600nw-2052644825.jpg",
    price: 23,
    unitDisplayName: "kl",
    quantity: 24,
    images,
    ...extraInfo,
  },
  {
    productId: 7,
    name: "Pineapple",
    url: "pineapple",
    description:
      "Sweet, juicy pineapples ideal for fresh consumption or canning, with a naturally vibrant flavor. Available in bulk for both domestic and international buyers. Perfect for salads, juices, or as a snack.",
    imageUrl: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
    price: 23,
    unitDisplayName: "kl",
    quantity: 24,
    images,
    ...extraInfo,
  },
];

const categories: Category[] = [
  {
    categoryId: 1,
    categoryName: "Rice",
    categoryUrl: "rice",
    items: [
      { name: "Corn Rice", url: "corn-rice" },
      { name: "Glutinous Rice", url: "glutinous-rice" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Fruits",
    categoryUrl: "fruits",
    items: [
      { name: "Marang", url: "marang" },
      { name: "Mangoes", url: "mangoes" },
      { name: "Fresh Coconut", url: "coconuts" },
      { name: "Banana", url: "banana" },
      { name: "Watermelon", url: "watermelon" },
      { name: "Papayas", url: "papayas" },
      { name: "Avocados", url: "avocados" },
      { name: "Jackfruits", url: "jackfruits" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Legumes",
    categoryUrl: "legumes",
    items: [
      { name: "Peanuts", url: "peanuts" },
      { name: "Mongo", url: "mongo-beans" },
      { name: "String Beans", url: "string-beans" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Green Leafy Vegetables",
    categoryUrl: "green-leafy-vegetables",
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
    categoryId: 1,
    categoryName: "Livestocks",
    categoryUrl: "livestocks",
    items: [
      { name: "Bisaya Chickens", url: "chickens" },
      { name: "45 days Chicken", url: "45days-chicken" },
      { name: "Pigs", url: "pigs" },
      { name: "Goats", url: "goats" },
      { name: "Ducks", url: "duck" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Farm Tools",
    categoryUrl: "farm-tools",
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
    categoryId: 1,
    categoryName: "Vegetables",
    categoryUrl: "vegetables",
    items: [
      { name: "Sponge gourd/Patola", url: "patola" },
      { name: "Banana heart", url: "banana-heart" },
      { name: "Tomatoes", url: "tomatoes" },
      { name: "Cucumbers", url: "cucumbers" },
      { name: "Sili Labuyo", url: "hot-peppers" },
      { name: "Eggplant", url: "eggplants" },
      { name: "Okra", url: "okra" },
      { name: "Spring onion", url: "spring-onions" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Herbs and Spices",
    categoryUrl: "herbs-and-spices",
    items: [
      { name: "Oregano", url: "oregano" },
      { name: "Basil", url: "basil" },
      { name: "Mint", url: "mint" },
      { name: "Ginger", url: "ginger" },
      { name: "Lemon Grass", url: "lemon grass" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Firewood",
    categoryUrl: "firewood",
    items: [
      { name: "Hardwood", url: "hardwood" },
      { name: "Softwood", url: "softwood" },
      { name: "Charcoal", url: "charcoal" },
      { name: "Logs", url: "logs" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Tubers and Roots",
    categoryUrl: "tubers-and-roots",
    items: [
      { name: "Sweet Potatoes", url: "sweet-potatoes" },
      { name: "Cassava", url: "cassava" },
      { name: "Taro/Gabi", url: "taro" },
      { name: "Ginger", url: "ginger" },
    ],
  },
  {
    categoryId: 1,
    categoryName: "Process Products",
    categoryUrl: "process-product",
    items: [
      { name: "Peanut butter", url: "peanut-butter" },
      { name: "Cassava Cake", url: "cassava-cake" },
    ],
  },
];

// Combine products into category items based on matching URLs
const combinedProducts: (Category & { items: (CategoryItem & Product)[] })[] =
  categories.map((category) => ({
    ...category,
    items: category?.items?.map((item) => {
      const matchingProduct = products.find(
        (product) => product.url === item.url,
      );
      return matchingProduct ? { ...item, ...matchingProduct } : item;
    }) as (CategoryItem & Product)[],
  }));

const upcomingHarvests: Harvest[] = [
  { crop: "Summer Squash", date: "July 15, 2023" },
  { crop: "Sweet Corn", date: "August 1, 2023" },
  { crop: "Pumpkins", date: "September 20, 2023" },
];
const availableCrops: string[] = [
  "Tomatoes",
  "Cucumbers",
  "Lettuce",
  "Carrots",
  "Peppers",
  "Herbs",
];
const successfulOrders: Order[] = [
  {
    id: 1,
    date: "2023-06-01",
    customerName: "John Doe",
    total: 25.97,
    items: [
      { name: "Heirloom Tomatoes", quantity: 2 },
      { name: "Organic Apples", quantity: 3 },
      { name: "Fresh Eggs", quantity: 1 },
    ],
  },
  {
    id: 2,
    date: "2023-06-02",
    customerName: "Jane Smith",
    total: 18.97,
    items: [
      { name: "Honey", quantity: 1 },
      { name: "Organic Apples", quantity: 2 },
    ],
  },
  {
    id: 3,
    date: "2023-06-03",
    customerName: "Bob Johnson",
    total: 31.95,
    items: [
      { name: "Fresh Eggs", quantity: 2 },
      { name: "Heirloom Tomatoes", quantity: 3 },
      { name: "Honey", quantity: 1 },
    ],
  },
];

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: "The Benefits of Crop Rotation",
    date: "2023-05-15",
    excerpt:
      "Learn how we use crop rotation to maintain soil health and improve our harvest yields.",
  },
  {
    id: 2,
    title: "Introducing Our New Honey Varieties",
    date: "2023-06-01",
    excerpt:
      "We're excited to announce two new honey flavors from our expanded beekeeping operation.",
  },
  {
    id: 3,
    title: "Preparing for the Fall Planting Season",
    date: "2023-08-20",
    excerpt:
      "Get a sneak peek at what we're planning to grow this fall and winter.",
  },
];

const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
    alt: "Farm fields at sunset",
    category: "farm",
  },
  {
    id: 2,
    src: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
    alt: "Freshly harvested vegetables",
    category: "product",
  },
  {
    id: 3,
    src: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
    alt: "Barn and silo",
    category: "farm",
  },
  {
    id: 4,
    src: "https://cdn.britannica.com/54/119354-050-FA32210A/pineapple.jpg",
    alt: "Organic apples on tree",
    category: "product",
  },
  {
    id: 5,
    src: "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    alt: "Tractor in field",
    category: "farm",
  },
  {
    id: 6,
    src: "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
    alt: "Fresh eggs in basket",
    category: "product",
  },
  {
    id: 7,
    src: "https://www.allthatgrows.in/cdn/shop/articles/Optimized-Feat_image-Sweetcorn_1100x1100.jpg?v=1680067377",
    alt: "Greenhouse interior",
    category: "farm",
  },
  {
    id: 8,
    src: "https://www.allthatgrows.in/cdn/shop/articles/Optimized-Feat_image-Sweetcorn_1100x1100.jpg?v=1680067377",
    alt: "Jars of honey",
    category: "product",
  },
];

const farmer: Farmer = {
  farmerId: 1,
  name: "Nanay Nitz",
  url: "nanay-nitz-fresh-veggies-farm",
  farmName: "Nanay Nitz Fresh Vegies Farm",
  bio: "Nanay Nitz has been growing organic produce for over 15 years. Her farm specializes in heirloom varieties and sustainable farming practices.",
  image:
    "https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/327178826_842506286810064_8956730658938393487_n.png?_nc_cat=101&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=SzGJ24Z0opwQ7kNvgEccTne&_nc_ht=scontent.fmnl8-3.fna&_nc_gid=AY6NgxWMtCnxlic8Iu6ULGu&oh=00_AYB28eRXS89GEwfMFEMCr9JfTYrXDFZYL8iSx98KNlaQgQ&oe=66FFF3AD",
  images: [
    "https://images.squarespace-cdn.com/content/v1/5c1074accc8fed6a4251da8f/4882b78a-b5d4-47a1-a9a0-d05a4fdbd724/shutterstock_490174816.jpg",
    "https://images.immediate.co.uk/production/volatile/sites/30/2013/05/rice-a941d59.jpg?resize=1200%2C630",
    "https://images.theconversation.com/files/142716/original/image-20161021-1763-13xoceb.jpg?ixlib=rb-4.1.0&q=20&auto=format&w=320&fit=clip&dpr=2&usm=12&cs=strip",
  ],
  address: "1234 Farm Road, Countryside, State 12345",
  phone: "(555) 123-4567",
  email: "sarah@sunshineorganicfarm.com",
  mapUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=125.5208%2C9.1077%2C125.5408%2C9.1277&layer=mapnik",
  socialMedia: {
    facebook: "https://facebook.com/sunshineorganicfarm",
  },
};

export {
  products,
  categories,
  combinedProducts,
  upcomingHarvests,
  availableCrops,
  successfulOrders,
  galleryImages,
  farmer,
  blogPosts,
};
