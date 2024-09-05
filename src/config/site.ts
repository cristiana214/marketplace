export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Marketplace",
  description:
    "Welcome to NanayNitz Fresh Veggies Farm your one-stop shop for the finest locally grown produce! We offer a wide variety of farm-fresh products straight from our farm. All our products are sustainably grown, ensuring both quality and freshness in every bite. Experience the best nature has to offer, delivered straight to your doorstep.",
  mainNav: [
    {
      title: "Categories",
      href: "/genre",
    },
    {
      title: "Farm tools ",
      href: "/tools",
    },
    {
      title: "Vegetables",
      href: "/genre/vegetables/",
    },
    {
      title: "Banana",
      href: "/item/banana/",
    },
  ],
  links: {
    twitter: "https://twitter.com/devcodingmemes",

    github: "https://github.com/cristiana214/marketplace",
    facebook: "https://www.facebook.com/freshveggiesfarm",
  },
};
