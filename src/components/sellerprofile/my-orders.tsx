import OrderList from "./order-list";

const MyOrders = () => {
  const orders = [
    {
      id: 1,
      product: "Organic Tomatoes",
      quantity: 50,
      status: "Completed",
      date: "2023-06-01",
    },
    {
      id: 2,
      product: "Fresh Lettuce",
      quantity: 30,
      status: "In Progress",
      date: "2023-06-05",
    },
    {
      id: 3,
      product: "Carrots",
      quantity: 100,
      status: "Pending",
      date: "2023-06-10",
    },
  ];

  return (
    <div>
      <h3 className="mb-4 text-xl font-semibold">My Orders</h3>
      <OrderList orders={orders} showStatus />
    </div>
  );
};

export default MyOrders;
