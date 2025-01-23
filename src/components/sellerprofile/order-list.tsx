import { Button } from "@/components/ui/button";
import type { OrderProduct } from "@/types/data";
import moment from "moment";

interface OrderListProps {
  orders: OrderProduct[];
  showStatus: boolean;
}

const OrderList = ({ orders, showStatus }: OrderListProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
          <th className="px-2 py-3 text-left sm:px-6">Order ID</th>
          <th className="px-2 py-3 text-left sm:px-6">Product</th>
          <th className="px-2 py-3 text-left">Quantity</th>
          {showStatus && (
            <th className="px-2 py-3 text-left sm:px-6">Status</th>
          )}
          <th className="px-2 py-3 text-left sm:px-6">Price</th>
          <th className="px-2 py-3 text-left sm:px-6">Total</th>
          <th className="px-2 py-3 text-left sm:px-6">Address</th>
          <th className="px-2 py-3 text-left sm:px-6">Date</th>
          <th className="px-2 py-3 text-left sm:px-6">Customer</th>
          {/* <th className="px-2 py-3 text-center sm:px-6">Actions</th> */}
        </tr>
      </thead>
      <tbody className="text-sm font-light text-gray-600">
        {orders.map((order) => (
          <tr
            key={`${order.orderId}${order.productId}`}
            className="border-b border-gray-200 hover:bg-gray-200"
          >
            <td className="whitespace-nowrap px-2 py-3 text-left sm:px-6">
              {order.orderId}
            </td>
            <td className="px-2 py-3 text-left sm:px-6">{order.productName}</td>
            <td className="px-2 py-3 text-left">{order.totalQuantity}</td>
            {showStatus && (
              <td className="px-2 py-3 text-left sm:px-6">
                <span
                  className={`${
                    order.isCompleted === true
                      ? "bg-green-200 text-green-600"
                      : "bg-yellow-200 text-yellow-600"
                  } rounded-full px-3 py-1 text-xs`}
                >
                  {order.currentStatus}
                  {order.isCompleted ? "Completed" : "Inprogress"}
                </span>
              </td>
            )}

            <td className="px-2 py-3 text-left sm:px-6">
              {order.currentPrice}
            </td>
            <td className="px-2 py-3 text-left font-bold sm:px-6">
              {order.currentPrice * order.totalQuantity}
            </td>
            <td className="px-2 py-3 text-left sm:px-6">{order.address}</td>
            <td className="px-2 py-3 text-left sm:px-6">
              {moment(order.dateAdded).format("MMM DD, YYYY HH:mm:ss")}
            </td>
            <td className="px-2 py-3 text-left sm:px-6">
              {order?.username || ""}
            </td>
            {/* <td className="px-2 py-3 text-center sm:px-6">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </td> */}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderList;
