import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import ListCard from "@/components/list-card";
import ListCategories from "@/components/list-categories";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold  tracking-tighter sm:text-4xl ">
          Fresh Farm Produce - Direct from local Farm
          <br className="hidden sm:inline" />
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>

      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl">
        Shop now and support our local farm while enjoying healthy, fresh, and
        organic produce!
      </h2>
      <div className="flex flex-wrap gap-4">
        <Link href="/category/fruits/">
          <Button className="bg-green-400 hover:font-semibold" rel="noreferrer">
            Fruits
          </Button>
        </Link>

        <Link href="/category/vegetables/">
          <Button className="bg-green-600 hover:font-semibold" rel="noreferrer">
            Vegetables
          </Button>
        </Link>
        <Link href="/product/coconuts/">
          <Button className="bg-green-700 hover:font-semibold" rel="noreferrer">
            Fresh Coconuts
          </Button>
        </Link>
        <Link href="/category/">
          <Button variant="outline" rel="noreferrer">
            Categories
          </Button>
        </Link>
      </div>
      <ListCategories />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ListCard />
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href={siteConfig.links.facebook}>
          <Button className="bg-blue-700 hover:font-semibold" rel="noreferrer">
            Facebook
          </Button>
        </Link>
        <Link href={siteConfig.links.twitter}>
          <Button
            className="bg-skyblue-500 hover:font-semibold"
            rel="noreferrer"
          >
            Twitter
          </Button>
        </Link>
      </div>
    </section>
  );
}
