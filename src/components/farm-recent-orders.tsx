import { successfulOrders } from "@/lib/data/farm";

const FarmRecentOrders = () => (
  <ul className="space-y-4">
    {successfulOrders.map((order) => (
      <li key={order.id} className="border-b pb-4 last:border-b-0">
        <div className="mb-2 flex items-center justify-between">
          <span className="font-semibold">Order #{order.id}</span>
          <span className="text-sm text-gray-600">{order.date}</span>
        </div>
        <p className="mb-2 text-sm">Customer: {order.customerName}</p>
        <ul className="mb-2 list-inside list-disc text-sm">
          {order.items.map((item, index) => (
            <li key={index}>
              {item.name} x {item.quantity}
            </li>
          ))}
        </ul>
        <p className="font-medium">Total: ${order.total.toFixed(2)}</p>
      </li>
    ))}
  </ul>
);
export default FarmRecentOrders;
