import { Button } from "@/components/ui/button";
import type { OrderProduct } from "@/types/data";

interface OrderListProps {
  orders: OrderProduct[];
  showStatus: boolean;
}

const OrderList = ({ orders, showStatus }: OrderListProps) => (
  <div className="overflow-x-auto">
    <table className="min-w-full bg-white">
      <thead>
        <tr className="bg-gray-100 text-sm uppercase leading-normal text-gray-600">
          <th className="px-6 py-3 text-left">Order ID</th>
          <th className="px-6 py-3 text-left">Product</th>
          <th className="px-6 py-3 text-left">Quantity</th>
          {showStatus && <th className="px-6 py-3 text-left">Status</th>}
          <th className="px-6 py-3 text-left">Price</th>
          <th className="px-6 py-3 text-left">Total</th>
          <th className="px-6 py-3 text-left">address</th>
          <th className="px-6 py-3 text-left">Date</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm font-light text-gray-600">
        {orders.map((order) => (
          <tr
            key={`${order.orderId}${order.productId}`}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap px-6 py-3 text-left">
              {order.orderId}
            </td>
            <td className="px-6 py-3 text-left">{order.productName}</td>
            <td className="px-6 py-3 text-left">{order.totalQuantity}</td>
            {showStatus && (
              <td className="px-6 py-3 text-left">
                <span
                  className={`${
                    // eslint-disable-next-line no-nested-ternary
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

            <td className="px-6 py-3 text-left">{order.currentPrice}</td>
            <td className="px-6 py-3 text-left font-bold">
              {order.currentPrice * order.totalQuantity}
            </td>
            <td className="px-6 py-3 text-left">{order.address}</td>
            <td className="px-6 py-3 text-left">{order?.dateAdded || ""}</td>
            <td className="px-6 py-3 text-center">
              <Button variant="outline" size="sm">
                View Details
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default OrderList;
