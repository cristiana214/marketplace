import { useOrders } from "@/hooks/query/useOrders";
import type { ListOrdersProps } from "@/types/params";
import OrderList from "./order-list";

const InprogressOrders = ({ type, id, status, className }: ListOrdersProps) => {
  const { data, isLoading, error } = useOrders({
    [type]: id,
    status,
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
      <h3 className="mb-4 text-xl font-semibold">In-progress Orders</h3>
      <OrderList orders={filteredOrders} showStatus={false} />
    </div>
  );
};

export default InprogressOrders;
