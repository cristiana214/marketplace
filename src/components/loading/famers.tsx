import { Card, CardContent } from "../ui/card";

const FarmersSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index}>
        <CardContent className="animate-pulse pt-4">
          <div className="mb-4 flex items-center space-x-4">
            <div className="size-12 rounded-full bg-gray-300" />
            <div>
              <div className="h-4 w-24 rounded bg-gray-300" />
              <div className="mt-1 h-3 w-32 rounded bg-gray-300" />
            </div>
          </div>
          <div className="space-y-1">
            <div className="flex items-center">
              <div className="mr-2 size-4 rounded bg-gray-300" />
              <div className="h-3 w-20 rounded bg-gray-300" />
            </div>
            <div className="flex items-center">
              <div className="mr-2 size-4 rounded bg-gray-300" />
              <div className="h-3 w-20 rounded bg-gray-300" />
            </div>
            <div className="flex items-center">
              <div className="mr-2 size-4 rounded bg-gray-300" />
              <div className="h-3 w-20 rounded bg-gray-300" />
            </div>
          </div>
          <div className="mt-4 h-8 w-full rounded bg-gray-300" />
        </CardContent>
      </Card>
    ))}
  </div>
);
export default FarmersSkeleton;
