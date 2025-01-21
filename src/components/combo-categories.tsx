/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useCategories } from "@/hooks/query/useCategories";
import type { ComboboxItem } from "@/lib/data/unitTypes";
import Combobox from "./reusable/combobox";

interface ComboCategoriesProps {
  selectedItems: ComboboxItem[] | undefined;
  onSelect: (selected: ComboboxItem[]) => void;
}
const ComboCategories = ({ selectedItems, onSelect }: ComboCategoriesProps) => {
  const { data, isLoading, error } = useCategories();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  const categories = data?.categories;

  const comboboxItems = categories?.map((category) => ({
    id: category.categoryId,
    name: category.categoryName,
    url: category.categoryUrl,
  }));

  const handleSelect = (selected: ComboboxItem[]) => {
    onSelect(selected);
  };

  if (!comboboxItems?.length) return null;
  return (
    <div className="flex w-40 items-center space-x-4">
      <Combobox
        items={comboboxItems}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        isMultiSelect={false} // Set to false for single select
        placeholder="Select Category"
      />
    </div>
  );
};
export default ComboCategories;
