/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */

"use client";

import moment from "moment";

import { useOrders } from "@/hooks/query/useOrders";
import { Hash, Calendar, User, DollarSign } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

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
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 md:p-8">
      <div className="mx-auto max-w-4xl">
        {filteredOrders?.map((order: any) => (
          <Card className="mx-auto mt-3 w-full max-w-md">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-2xl font-bold">
                <Hash className="size-6" />
                Order {order.orderId}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Calendar className="size-4" />
                  {moment(order.dateAdded).format("MMM DD, YYYY HH:mm:s")}
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <User className="size-4" />
                  {order.username}
                </div>
                <div className="text-sm text-gray-600">
                  Customer ID: {order.userId}
                </div>
                {order.messageForSeller ? (
                  <div className="text-sm text-gray-600">
                    Message to seller: {order.messageForSeller}
                  </div>
                ) : null}
                <div className="mt-4 border-t border-gray-200 pt-4">
                  <h3 className="mb-2 font-semibold">Order Items:</h3>
                  <ul className="space-y-2">
                    {/* {order.items.map((item, index) => ( */}
                    <li className="flex justify-between">
                      <span>
                        {order.productName} x {order.totalQuantity}
                      </span>
                      <span>₱{order.currentPrice.toFixed(2)}</span>
                    </li>
                    {/* ))} */}
                  </ul>
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-gray-200 pt-4 font-semibold">
                  <span>Total:</span>
                  <span className="flex items-center gap-1 text-lg">
                    {/* <DollarSign className="size-5" />₱ */}₱
                    {order?.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
  // <ul className="space-y-4">
  //   {filteredOrders?.map((order: any) => (
  //     <li key={order.id} className="border-b pb-4 last:border-b-0">
  //       <div className="mb-2 flex items-center justify-between">
  //         <span className="font-semibold">Order #{order.orderId}</span>
  //         <span className="text-sm text-gray-600">
  //           {moment(order.dateAdded).format("MMM DD, YYYY HH:mm:s")}
  //         </span>
  //       </div>
  //       <p className="mb-2 text-sm">Customer: {order.username}</p>
  //       <p className="mb-2 text-sm">Customer ID: {order.userId}</p>
  //       <ul className="mb-2 list-inside list-disc text-sm">
  //         {order.productName} x {order.totalQuantity}
  //       </ul>
  //       <p className="font-medium">
  //         Price each: P{order.currentPrice.toFixed(2)}
  //       </p>
  //       <p className="font-medium">Total: P{order.totalPrice.toFixed(2)}</p>
  //     </li>
  //   ))}
  // </ul>
};
export default ListSellerOrders;
