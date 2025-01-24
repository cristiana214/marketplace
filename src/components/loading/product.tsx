import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";
import { GridLayout, GridItemEight, GridItemFour } from "../ui/grid";

const ProductSkeleton = () => (
  <GridLayout>
    <GridItemEight>
      <div className="relative mb-4 aspect-square animate-pulse bg-gray-200" />
      <div className="flex gap-4 overflow-x-auto">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="relative size-24 animate-pulse overflow-hidden rounded-md bg-gray-200"
          />
        ))}
      </div>
      <div className="mt-12">
        <h2 className="mb-4 h-6 w-48 animate-pulse bg-gray-200 text-2xl font-bold" />
        <div className="mb-8 space-y-4">
          {[...Array(3)].map((_, index) => (
            <div
              key={index}
              className="h-24 animate-pulse rounded-md bg-gray-200 p-4"
            />
          ))}
        </div>
        <form>
          <h3 className="mb-2 h-6 w-32 animate-pulse bg-gray-200 text-xl font-semibold" />
          <div className="mb-4 h-24 animate-pulse rounded-md bg-gray-200" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
        </form>
      </div>
    </GridItemEight>
    <GridItemFour>
      <div className="mb-4 h-8 w-48 animate-pulse bg-gray-200" />
      <div className="mb-4 h-6 w-32 animate-pulse bg-gray-200" />
      <div className="mb-4 h-24 animate-pulse bg-gray-200" />
      <div className="mb-4 flex items-center gap-4">
        <div className="size-10 animate-pulse rounded-full bg-gray-200" />
        <div className="size-10 animate-pulse rounded-full bg-gray-200" />
        <div className="h-10 w-32 animate-pulse rounded-md bg-gray-200" />
      </div>
      <Tabs defaultValue="farmer">
        <TabsList>
          <TabsTrigger value="farmer">Farmer Profile</TabsTrigger>
          <TabsTrigger value="more-info">Description</TabsTrigger>
        </TabsList>
        <TabsContent value="more-info">
          <div className="h-24 animate-pulse rounded-md bg-gray-200 p-4" />
        </TabsContent>
        <TabsContent value="farmer">
          <div className="h-24 animate-pulse rounded-md bg-gray-200 p-4" />
        </TabsContent>
      </Tabs>
    </GridItemFour>
  </GridLayout>
);
export default ProductSkeleton;
