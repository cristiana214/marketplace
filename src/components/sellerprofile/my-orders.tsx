import type { ListOrdersProps } from "@/types/params";
import { useOrders } from "@/hooks/query/useOrders";
import OrderList from "./order-list";

const MyOrders = ({ type, id, className }: ListOrdersProps) => {
  const { data, isLoading, error } = useOrders({
    [type]: 10,
  });

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
    <div>
      <h3 className="mb-4 text-xl font-semibold">My Orders</h3>
      <OrderList orders={filteredOrders} showStatus />
    </div>
  );
};

export default MyOrders;
