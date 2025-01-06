/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */

"use client";

import { useState } from "react";
import * as Popover from "@radix-ui/react-popover";
import { cn } from "@/lib/utils";
import type { ComboboxItem } from "@/lib/data/unitTypes";

type ComboboxProps = {
  items: ComboboxItem[];
  selectedItems?: ComboboxItem[]; // For multi-select
  onSelect: (selected: ComboboxItem[]) => void;
  placeholder?: string;
  isMultiSelect?: boolean;
};

const Combobox = ({
  items,
  selectedItems = [],
  onSelect,
  placeholder = "Search...",
  isMultiSelect = false,
}: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");

  const filteredItems = query
    ? items.filter((item) =>
        item.name.toLowerCase().includes(query.toLowerCase()),
      )
    : items;

  const handleSelect = (item: ComboboxItem) => {
    let updatedSelection;
    if (isMultiSelect) {
      // For multi-select: Add or remove items
      if (selectedItems.find((i) => i.id === item.id)) {
        updatedSelection = selectedItems.filter((i) => i.id !== item.id);
      } else {
        updatedSelection = [...selectedItems, item];
      }
    } else {
      // For single-select: Replace selection
      updatedSelection = [item];
    }
    onSelect(updatedSelection);
    if (!isMultiSelect) setOpen(false); // Close on single select
  };

  return (
    <Popover.Root open={open} onOpenChange={setOpen}>
      <Popover.Trigger asChild>
        <div
          className="w-full cursor-pointer rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onClick={() => setOpen(!open)}
        >
          {selectedItems.length > 0
            ? selectedItems.map((item) => item.name).join(", ")
            : placeholder}
        </div>
      </Popover.Trigger>
      <Popover.Content
        align="start"
        className="mt-2 max-h-60 w-full overflow-y-auto rounded-md border bg-white shadow-lg"
      >
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => handleSelect(item)}
              className={cn(
                "cursor-pointer px-4 py-2 hover:bg-gray-100",
                selectedItems.find((i) => i.id === item.id) &&
                  "bg-blue-100 text-blue-700",
              )}
            >
              {item.name}
            </div>
          ))
        ) : (
          <div className="px-4 py-2 text-gray-500">No results found</div>
        )}
      </Popover.Content>
    </Popover.Root>
  );
};

export default Combobox;
