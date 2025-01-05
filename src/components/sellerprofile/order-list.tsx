import { Button } from "@/components/ui/button";

interface Order {
  id: number;
  product: string;
  quantity: number;
  status?: string;
  date: string;
}

interface OrderListProps {
  orders: Order[];
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
          <th className="px-6 py-3 text-left">Date</th>
          <th className="px-6 py-3 text-center">Actions</th>
        </tr>
      </thead>
      <tbody className="text-sm font-light text-gray-600">
        {orders.map((order) => (
          <tr
            key={order.id}
            className="border-b border-gray-200 hover:bg-gray-100"
          >
            <td className="whitespace-nowrap px-6 py-3 text-left">
              {order.id}
            </td>
            <td className="px-6 py-3 text-left">{order.product}</td>
            <td className="px-6 py-3 text-left">{order.quantity}</td>
            {showStatus && (
              <td className="px-6 py-3 text-left">
                <span
                  className={`${
                    // eslint-disable-next-line no-nested-ternary
                    order.status === "Completed"
                      ? "bg-green-200 text-green-600"
                      : order.status === "In Progress"
                        ? "bg-yellow-200 text-yellow-600"
                        : "bg-red-200 text-red-600"
                  } rounded-full px-3 py-1 text-xs`}
                >
                  {order.status}
                </span>
              </td>
            )}
            <td className="px-6 py-3 text-left">{order.date}</td>
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
