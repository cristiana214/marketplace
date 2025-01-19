import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import ListCard from "@/components/list-card";
import ListCategories from "@/components/list-categories";
import ListProducts from "@/components/list-products";
import CartTotal from "@/components/cart-total";

import DropdownCategory from "@/components/dropdown-category";
import Footer from "@/components/footer";

export default function IndexPage() {
  return (
    <section className="container mx-auto grid w-full max-w-6xl  gap-6 pb-8 pt-6 ">
      <div className="mx-auto w-full py-4">
        <h1 className="text-4xl font-bold tracking-tighter sm:text-4xl">
          Fresh Farm Produce - Direct from local farm to your door
        </h1>
        <p className="mt-4 max-w-[700px] text-lg text-muted-foreground ">
          {siteConfig.description}
        </p>
      </div>

      <h2 className="text-1xl mt-8 font-semibold leading-tight tracking-tighter sm:text-3xl">
        Shop now and support our local farm while enjoying healthy, fresh, and
        organic produce!
      </h2>

      <div className="flex flex-wrap gap-4">
        <Link href="/category/fruits/">
          <Button className="bg-green-400 hover:font-semibold" rel="noreferrer">
            Fruits
          </Button>
        </Link>

        <Link href="/category/fruit-vegetables/">
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
      <ListProducts type="home" />

      {/* <div className="flex flex-wrap gap-4">
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
            Twitters
          </Button>
        </Link> */}
      {/* </div> */}
    </section>
  );
}
