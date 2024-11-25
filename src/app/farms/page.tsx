import { siteConfig } from "@/config/site";

import ListSellers from "@/components/list-sellers";

export default function FarmsPage() {
  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <div className="mb-8  flex w-full flex-col gap-2">
        <div className="flex w-full items-start justify-between">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl">
            Fresh Farm Produce - Direct from local Farm
            <br className="hidden sm:inline" />
          </h1>
        </div>
        <p className="max-w-[700px] text-lg text-muted-foreground">
          {siteConfig.description}
        </p>
      </div>

      <h2 className="mt-8 text-2xl font-semibold leading-tight tracking-tighter sm:text-3xl">
        Shop now and support our local farm while enjoying healthy, fresh, and
        organic produce!
      </h2>
      <ListSellers />
    </section>
  );
}
