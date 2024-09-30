export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Agri CBR",
  description:
    "Welcome to Agri CBR your one-stop markertplace for the finest locally grown produce! We offer a wide variety of farm-fresh products straight from the farms. All our products are sustainably grown, ensuring both quality and freshness in every bite. Experience the best nature has to offer, delivered straight to your doorstep.",
  mainNav: [
    {
      title: "Category",
      href: "/category/",
    },
    {
      title: "Fruits ",
      href: "/category/fruits/",
    },

    {
      title: "Farms",
      href: "/category/farms/",
    },
    {
      title: "Vegetables",
      href: "/category/vegetables/",
    },
    {
      title: "About",
      href: "/marketplace/about/",
    },
  ],
  links: {
    twitter: "https://twitter.com/icitsice",

    github: "https://github.com/cristiana214/marketplace",
    facebook: "https://www.facebook.com/freshveggiesfarm",
  },
};
