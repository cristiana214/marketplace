import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import ListCard from "@/components/list-card";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold  tracking-tighter sm:text-4xl ">
          From Bugs to Laughs
          <br className="hidden sm:inline" />
          Debug Your Day with a Dose of Humor and Compile Happiness with Every
          Scroll.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>
      <div className="flex flex-wrap gap-4">
        <Link href={siteConfig.links.lens}>
          <Button className="bg-green-300 hover:font-semibold" rel="noreferrer">
            Lens
          </Button>
        </Link>
        <Link href={siteConfig.links.farcaster}>
          <Button
            className="bg-violet-800 hover:font-semibold"
            rel="noreferrer"
          >
            Farcaster
          </Button>
        </Link>
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
        <Link href="/genre/">
          <Button variant="outline" rel="noreferrer">
            Categories
          </Button>
        </Link>
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl">
        Guess who is looking at memes all day instead of fixing their code?
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <ListCard />
      </div>
    </section>
  );
}
