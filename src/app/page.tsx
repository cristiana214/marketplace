import Link from "next/link";

import { siteConfig } from "@/config/site";
import { Button } from "@/components/ui/button";

import ListCard from "@/components/list-card";

export default function IndexPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="flex max-w-[980px] flex-col items-start gap-2">
        <h1 className="text-3xl font-bold  tracking-tighter sm:text-4xl ">
          Order through AgriWeb, <br className="hidden sm:inline" />
          and you can enjoy convenient <br className="hidden sm:inline" />
          same-day produced delivery.
        </h1>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>
      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3" />
    </section>
  );
}
