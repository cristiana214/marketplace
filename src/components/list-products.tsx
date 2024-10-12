"use client";

import { useProducts } from "@/hooks/query/useProducts";
import { categories } from "@/lib/data/farm";

import Link from "next/link";
import { Card, CardContent } from "./ui/card";

type ListProductsProps = {
  url: string;
};
const ListProducts = ({ url }: ListProductsProps) => {
  const category = categories.find((cat) => cat.url === url);
  const { data, isLoading, error } = useProducts({
    categoryUrl: category?.url,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;

  return (
    <div className="mx-auto mt-6 max-w-md rounded-sm bg-gray-100 p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-xl font-bold text-gray-900 dark:text-gray-100">
        {category?.name} Products
      </h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {data?.products?.map((product, index) => (
          // <li
          //   key={product.productId}
          //   className="cursor-pointer rounded-md bg-green-200 p-2 shadow transition duration-200 ease-in-out hover:bg-green-500 hover:text-white dark:bg-gray-700 dark:hover:bg-slate-400 dark:hover:text-white"
          // >
          //   <Link href={`/product/${product.productId}/`}>{product.name}</Link>
          // </li>
          <Card key={product.productId}>
            <CardContent className="p-4">
              {/* <Image
                src={product.imageUrl}
                alt={product.name}
                width={400}
                height={200}
                className="mb-2 rounded-md"
              /> */}
              <h3 className="font-semibold">{product.name}</h3>
              <p className="text-sm text-gray-600">
                {product?.description || ""}
              </p>
              <p className="font-medium">
                P{product.price.toFixed(2)} / {product.unit}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ListProducts;
