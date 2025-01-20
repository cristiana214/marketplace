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
  userUrl?: string;
  className?: string;
};
const ListUserOrders = ({ type, userUrl, className }: ListOrdersProps) => {
  const { data, isLoading, error } = useOrders({
    [type]: userUrl,
  });

  // const searchParams = useSearchParams()
  // const search = searchParams.get('search');

  if (isLoading) return <div>Loading orders...</div>;
  if (error) return <div>Error loading orders</div>;
  const filteredOrders = data?.orders;

  if (!filteredOrders?.length) {
    return (
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="text-sm">No available orders now, add your order</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-8">
      <div className="mx-auto max-w-3xl">
        {filteredOrders?.map((order: any) => (
          <Card className="mt-6 shadow-lg">
            <CardHeader className="border-b border-gray-200 pb-4">
              <CardTitle className="flex items-center gap-2 text-xl font-semibold text-gray-800">
                <Hash className="size-5 text-gray-500" />
                Order #{order.orderId}
                <div className="flex items-center justify-end gap-2 text-sm text-gray-500">
                  <Calendar className="size-4" />
                  {moment(order.dateAdded).format("MMM DD, YYYY HH:mm:ss")}
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div className="mx-auto flex">
                  <div className="m-4 text-sm text-gray-600">
                    <div className="flex text-sm text-gray-600">
                      <User className="size-4" />
                      <strong>Seller ID:</strong> {order.sellerId}
                    </div>
                    <div className="flex text-sm text-gray-600">
                      <User className="size-4" />
                      <strong>Seller Name:</strong> {order.sellerName}
                    </div>
                  </div>
                  <div className="m-4">
                    <div className="text-sm text-gray-600">
                      <strong>Status:</strong>{" "}
                      {order.isCompleted ? "Completed" : "Pending"}
                    </div>
                    {order.messageForSeller && (
                      <div className="text-sm text-gray-600">
                        <strong>Message to Seller:</strong>{" "}
                        {order.messageForSeller}
                      </div>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h3 className="mb-3 text-base font-semibold text-gray-800">
                    Order Items:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between text-sm text-gray-600">
                      <span>
                        {order.productName} x {order.totalQuantity}
                      </span>
                      <span>₱{order.currentPrice.toFixed(2)}</span>
                    </li>
                    {/* Add additional items here if available */}
                  </ul>
                </div>

                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-lg font-semibold text-gray-800">
                  <span>Total:</span>
                  <span className="flex items-center gap-1">
                    ₱{order?.totalPrice?.toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
export default ListUserOrders;
