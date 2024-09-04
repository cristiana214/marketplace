export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Coding Memes",
  description:
    "Collection of coding jokes, memes, funny programming quotes, algorithm jokes, funny developer comments, computer programming pictures that can help to make your day better.",
  mainNav: [
    {
      title: "Categories",
      href: "/genre",
    },
    {
      title: "JavaScript",
      href: "/js",
    },
    {
      title: "AI",
      href: "/ai",
    },
  ],
  links: {
    twitter: "https://twitter.com/devcodingmemes",
    twitterDev: "https://twitter.com/cristiana214",
    github: "https://github.com/cristiana214",
    lens: "https://hey.xyz/u/codingmemes",
    farcaster: "https://warpcast.com/codingmemes",
    facebook: "https://facebook.com/devcodingmemes",
  },
};
