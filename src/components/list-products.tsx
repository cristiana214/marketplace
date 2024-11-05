"use client";

import { useProducts } from "@/hooks/query/useProducts";
import { generateUrl } from "@/lib/helper/generate-url";
import { useCartStore } from "@/lib/store/useCartStore";
import clsx from "clsx";
import Link from "next/link";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

type ListProductsProps = {
  type: "home" | "categoryUrl" | "categoryTypeUrl" | "userUrl";
  url?: string;
  className?: string;
};
const ListProducts = ({ type, url, className }: ListProductsProps) => {
  const { setProducts, addToCart } = useCartStore();
  const { data, isLoading, error } = useProducts({
    [type]: url,
  });
  // const searchParams = useSearchParams()
  // const search = searchParams.get('search');

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading products</div>;
  const filteredProducts = data?.products;
  if (!filteredProducts?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-sm">
          No available product on this category, please add in db
        </div>
      </div>
    );
  }

  return (
    <div
      className={clsx(
        "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3",
        className,
      )}
    >
      {filteredProducts?.map((product) => (
        <Card key={product.productId}>
          <CardHeader>
            <CardTitle>
              <Link href={`/product/${product.productId}/`}>
                {product.name}
              </Link>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Link href={`/product/${product.productId}/`}>
              <img
                src={`https://img-farm.s3.us-west-2.amazonaws.com/product/${generateUrl(product.imageUrl) || `https://img-farm.s3.us-west-2.amazonaws.com/product/image.png`}`}
                alt={product.name}
                className="mb-4 h-72 w-full rounded-md object-cover"
              />
            </Link>
            <p className="text-lg font-semibold">
              P{product?.price?.toFixed(2)}/{product.unitDisplayName}
            </p>
            <p className="text-sm text-gray-500">{product.description}</p>

            <Link href={`/sub-category/${product.typeUrl}/`}>
              <Badge variant="secondary">{product.typeName}</Badge>
            </Link>
            <Link href={`/category/${product.categoryUrl}/`}>
              <Badge variant="outline">{product.categoryName}</Badge>
            </Link>
          </CardContent>
          <CardFooter>
            <Button
              onClick={() => addToCart(product.productId)}
              className="w-full"
            >
              Add to Cart
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};
export default ListProducts;
