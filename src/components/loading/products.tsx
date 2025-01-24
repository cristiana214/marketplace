import { Card, CardHeader, CardContent, CardFooter } from "../ui/card";
import type CategoriesSkeleton from "./categories";

const ProductsSkeleton = () => (
  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
    {Array.from({ length: 6 }).map((_, index) => (
      <Card key={index}>
        <CardHeader>
          <div className="mb-4 h-6 w-3/4 rounded bg-gray-300" />
        </CardHeader>
        <CardContent>
          <div className="mb-4 h-72 rounded bg-gray-300" />
          <div className="mb-2 h-6 w-1/2 rounded bg-gray-300" />
          <div className="mb-2 h-4 w-3/4 rounded bg-gray-300" />
          <div className="mb-4 h-4 w-1/4 rounded bg-gray-300" />
          <div className="mb-2 h-4 w-1/3 rounded bg-gray-300" />
          <div className="h-4 w-1/4 rounded bg-gray-300" />
        </CardContent>
        <CardFooter>
          <div className="h-10 w-full rounded bg-gray-300" />
        </CardFooter>
      </Card>
    ))}
  </div>
);
export default ProductsSkeleton;
