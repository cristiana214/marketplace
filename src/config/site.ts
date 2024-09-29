export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "AgriWeb",
  description: "Freshly vegetables for delivery and pick-up.",
  mainNav: [
    {
      title: "Products",
      href: "/categories",
    },

    {
      title: "Where we Deliever",
      href: "/us",
    },
    {
      title: "About Us",
      href: "/me",
    },
    {
      title: "FAQ",
      href: "/questions",
    },
  ],
};
