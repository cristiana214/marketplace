/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import moment from "moment";

import { useOrders } from "@/hooks/query/useOrders";

type ListOrdersProps = {
  type: "sellerId" | "userUrl";
  id?: number;
  className?: string;
};
const ListSellerOrders = ({ type, id, className }: ListOrdersProps) => {
  const { data, isLoading, error } = useOrders({
    [type]: id,
  });

  // const searchParams = useSearchParams()
  // const search = searchParams.get('search');

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;
  const filteredOrders = data?.orders;

  if (!filteredOrders?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-sm">No available orders now</div>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {filteredOrders?.map((order: any) => (
        <li key={order.id} className="border-b pb-4 last:border-b-0">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-semibold">Order #{order.orderId}</span>
            <span className="text-sm text-gray-600">
              {moment(order.dateAdded).format("MMM DD, YYYY HH:mm:s")}
            </span>
          </div>
          <p className="mb-2 text-sm">Customer: {order.username}</p>
          <p className="mb-2 text-sm">Customer ID: {order.userId}</p>
          <ul className="mb-2 list-inside list-disc text-sm">
            {order.productName} x {order.totalQuantity}
          </ul>
          <p className="font-medium">
            Price each: P{order.currentPrice.toFixed(2)}
          </p>
          <p className="font-medium">Total: P{order.totalPrice.toFixed(2)}</p>
        </li>
      ))}
    </ul>
  );
};
export default ListSellerOrders;
