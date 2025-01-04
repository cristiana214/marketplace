import OrderList from "./order-list";

const InProgressOrders = () => {
  const inProgressOrders = [
    { id: 2, product: "Fresh Lettuce", quantity: 30, date: "2023-06-05" },
    { id: 5, product: "Spinach", quantity: 40, date: "2023-06-08" },
    { id: 8, product: "Zucchini", quantity: 55, date: "2023-06-12" },
  ];

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">In-progress Orders</h3>
      <OrderList orders={inProgressOrders} showStatus={false} />
    </div>
  );
};

export default InProgressOrders;
