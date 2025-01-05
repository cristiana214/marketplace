/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import { useCategories } from "@/hooks/query/useCategories";
import { useCategoryTypes } from "@/hooks/query/useCategoryTypes";
import { categories } from "@/lib/data/farm";
import type { ComboboxItem } from "./reusable/combobox";
import Combobox from "./reusable/combobox";

interface ComboCategoriesProps {
  selectedItems: ComboboxItem[] | undefined;
  onSelect: (selected: ComboboxItem[]) => void;
  categoryUrl: string;
}
const ComboCategoryTypes = ({
  selectedItems,
  onSelect,
  categoryUrl,
}: ComboCategoriesProps) => {
  const { data, isLoading, error } = useCategoryTypes({ categoryUrl });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  const categoryTypes = data?.categoryTypes;

  console.log("Categories types: ", categoryTypes);
  const comboboxItems = categoryTypes?.map((categoryType) => ({
    id: categoryType.typeId,
    name: categoryType.typeName,
    url: categoryType.typeUrl,
  }));

  const handleSelect = (selected: ComboboxItem[]) => {
    onSelect(selected);
    console.log("Selected Items:", selected);
  };

  if (comboboxItems?.length)
    return (
      <div className="flex w-28 items-center space-x-4">
        <Combobox
          items={comboboxItems}
          selectedItems={selectedItems}
          onSelect={handleSelect}
          isMultiSelect={false} // Set to false for single select
          placeholder="Select Types..."
        />
      </div>
    );
  return false;
};
export default ComboCategoryTypes;
