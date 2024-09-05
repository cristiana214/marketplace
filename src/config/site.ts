export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Marketplace",
  description:
    "Welcome to NanayNitz Fresh Veggies Farm your one-stop shop for the finest locally grown produce! We offer a wide variety of farm-fresh products straight from our farm. All our products are sustainably grown, ensuring both quality and freshness in every bite. Experience the best nature has to offer, delivered straight to your doorstep.",
  mainNav: [
    {
      title: "Categories",
      href: "/category/",
    },
    {
      title: "Farm tools ",
      href: "/category/farm-tools/",
    },
    {
      title: "LiveStocks ",
      href: "/category/livestocks/",
    },
    {
      title: "Vegetables",
      href: "/category/vegetables/",
    },
    {
      title: "Banana",
      href: "/product/banana/",
    },
  ],
  links: {
    twitter: "https://twitter.com/itsicice",

    github: "https://github.com/cristiana214/marketplace",
    facebook: "https://www.facebook.com/freshveggiesfarm",
  },
};
