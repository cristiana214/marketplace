import OrderList from "./order-list";

const CompletedOrders = () => {
  const completedOrders = [
    { id: 1, product: "Organic Tomatoes", quantity: 50, date: "2023-06-01" },
    { id: 4, product: "Bell Peppers", quantity: 75, date: "2023-05-28" },
    { id: 7, product: "Cucumbers", quantity: 60, date: "2023-05-20" },
  ];

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">Completed Orders</h3>
      <OrderList orders={completedOrders} showStatus={false} />
    </div>
  );
};

export default CompletedOrders;
