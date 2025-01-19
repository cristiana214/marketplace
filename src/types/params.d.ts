export type ListOrdersProps = {
  type: "sellerId" | "userUrl";
  id?: number;
  status: "completed" | "inprogress" | "all";
  className?: string;
};
