/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import {
  type ComboboxUnitItem,
  type ComboboxItem,
  unitTypes,
} from "@/lib/data/unitTypes";
import Combobox from "./reusable/combobox";

interface ComboUnitsProps {
  selectedItems: ComboboxUnitItem[] | undefined;
  onSelect: (selected: ComboboxUnitItem[]) => void;
}
const ComboUnitTypes = ({ selectedItems, onSelect }: ComboUnitsProps) => {
  const handleSelect = (selected: ComboboxItem[]) => {
    onSelect(selected);
  };

  if (!unitTypes?.length) return null;
  return (
    <div className="flex w-40 items-center space-x-4">
      <Combobox
        items={unitTypes}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        isMultiSelect={false} // Set to false for single select
        placeholder="Select Unit"
      />
    </div>
  );
};
export default ComboUnitTypes;
