/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import {
  type ComboboxUnitItem,
  type ComboboxItem,
  statusTypes,
} from "@/lib/data/unitTypes";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Combobox from "./reusable/combobox";

interface ComboUnitsProps {
  selectedItems: ComboboxUnitItem[] | undefined;
  productId: number;
  orderId: number;
}

interface StatusProps {
  productId: number;
  orderId: number;
  isCompleted: boolean;
}
const ComboStatus = ({
  selectedItems,
  productId,
  orderId,
}: ComboUnitsProps) => {
  const queryClient = useQueryClient();
  // update status mutation
  const updateStatus = useMutation({
    mutationFn: async (data: StatusProps) => {
      const response = await fetch("/api/action/update/product_status/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save product");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
        refetchType: "all",
      });
      toast.success("Product status updated successfully!");
    },
    onError: () => {},
  });
  // handle update status
  const handleSelect = (selected: ComboboxItem[]) => {
    updateStatus.mutate({
      productId,
      orderId,
      isCompleted: selected[0].id === 1,
    });
  };

  if (!statusTypes?.length) return null;
  return (
    <div className="flex w-40 items-center space-x-4">
      <Combobox
        items={statusTypes}
        selectedItems={selectedItems}
        onSelect={handleSelect}
        isMultiSelect={false} // Set to false for single select
        placeholder="Select Status"
      />
    </div>
  );
};
export default ComboStatus;
