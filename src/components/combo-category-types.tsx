/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import { useCategoryTypes } from "@/hooks/query/useCategoryTypes";
import type { ComboboxItem } from "@/lib/data/unitTypes";
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

  const comboboxItems = categoryTypes?.map((categoryType) => ({
    id: categoryType.typeId,
    name: categoryType.typeName,
    url: categoryType.typeUrl,
  }));

  const handleSelect = (selected: ComboboxItem[]) => {
    onSelect(selected);
  };

  if (!comboboxItems?.length) if (!comboboxItems?.length) return null;
  return (
    <div className="flex w-40 items-center space-x-4">
      <Combobox
        items={comboboxItems}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        isMultiSelect={false} // Set to false for single select
        placeholder="Select Types"
      />
    </div>
  );
};
export default ComboCategoryTypes;
