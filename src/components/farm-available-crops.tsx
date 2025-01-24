/* eslint-disable @typescript-eslint/no-shadow */
import { useProducts } from "@/hooks/query/useProducts";
import { availableCrops } from "@/lib/data/farm";
import { Sprout } from "lucide-react";
import ProductsSkeleton from "./loading/products";

type ListProductsProps = {
  type: "userUrl";
  url?: string;
  className?: string;
};
const FarmAvailableCrops = ({ type, url, className }: ListProductsProps) => {
  const { data, isLoading, error } = useProducts({
    [type]: url,
  });

  if (isLoading) return <ProductsSkeleton />;
  if (error) return <div>Error loading products</div>;

  const availableCrops = data?.products;

  if (!availableCrops?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-sm">No available product</div>
      </div>
    );
  }
  return (
    <ul className="grid grid-cols-2 gap-2">
      {availableCrops?.map((product, index) => (
        <li key={index} className="flex items-center">
          <Sprout className="mr-2 size-4" />
          {product.typeName}
        </li>
      ))}
    </ul>
  );
};
export default FarmAvailableCrops;
