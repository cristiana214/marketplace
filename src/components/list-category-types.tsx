"use client";

import { useCategoryTypes } from "@/hooks/query/useCategoryTypes";
import { generateUrl } from "@/lib/helper/generate-url";
import Link from "next/link";
import { Button } from "./ui/button";

type Props = { url: string };
// also known as sub category
const ListCategoryTypes = ({ url }: Props) => {
  const { data, isLoading, error } = useCategoryTypes({ categoryUrl: url });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading category Types</div>;
  const categoryTypes = data?.categoryTypes;

  return (
    <div className="mb-8">
      <div className="flex flex-wrap gap-2">
        {categoryTypes?.map((types, index) => (
          <Link href={`/sub-category/${generateUrl(types.typeUrl)}`}>
            <Button
              key={index}
              variant="default"
              // onClick={() => setSelectedCategory(category)}
            >
              {types.typeName}
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
};
export default ListCategoryTypes;
