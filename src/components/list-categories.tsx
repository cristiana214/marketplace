"use client";

import { useCategories } from "@/hooks/query/useCategories";
import { generateUrl } from "@/lib/helper/generate-url";
import Link from "next/link";
import CategoriesSkeleton from "@/components/loading/categories";
import { Button } from "./ui/button";

const ListCategories = () => {
  const { data, isLoading, error } = useCategories();
  if (isLoading) return <CategoriesSkeleton />;
  if (error) return <div>Error loading categories</div>;
  const categories = data?.categories;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categories?.map((category, index) => (
          <Link
            href={`/category/${generateUrl(category.categoryUrl)}`}
            key={index}
          >
            <Button
              variant="default"
              className="bg-green-500 hover:font-semibold"
              // onClick={() => setSelectedCategory(category)}
            >
              {category.categoryName}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ListCategories;
