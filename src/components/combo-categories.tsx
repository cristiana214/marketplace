/* eslint-disable @next/next/no-img-element */

"use client";

import { useState } from "react";
import type { ComboboxItem } from "./reusable/combobox";
import Combobox from "./reusable/combobox";

const ComboCategories = () => {
  const categories = [
    { categoryId: 1, categoryName: "Rice", categoryUrl: "rice" },
    { categoryId: 2, categoryName: "Wheat", categoryUrl: "wheat" },
    { categoryId: 3, categoryName: "Corn", categoryUrl: "corn" },
  ];

  const comboboxItems: ComboboxItem[] = categories.map((category) => ({
    id: category.categoryId,
    name: category.categoryName,
  }));

  const [selectedItems, setSelectedItems] = useState<ComboboxItem[]>([]);

  const handleSelect = (selected: ComboboxItem[]) => {
    setSelectedItems(selected);
    console.log("Selected Items:", selected);
  };

  return (
    <div className="flex w-28 items-center space-x-4">
      <Combobox
        items={comboboxItems}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        isMultiSelect // Set to false for single select
        placeholder="Select Category..."
      />
    </div>
  );
};
export default ComboCategories;
