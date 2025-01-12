import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const customersData = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    totalOrders: 5,
    totalSpent: "$500",
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    totalOrders: 3,
    totalSpent: "$300",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "charlie@example.com",
    totalOrders: 7,
    totalSpent: "$700",
  },
  {
    id: 4,
    name: "Diana Ross",
    email: "diana@example.com",
    totalOrders: 2,
    totalSpent: "$200",
  },
  {
    id: 5,
    name: "Edward Norton",
    email: "edward@example.com",
    totalOrders: 4,
    totalSpent: "$400",
  },
];

const Customers = () => (
  <Card>
    <CardHeader>
      <CardTitle>Customer List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Total Orders</TableHead>
            <TableHead>Total Spent</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customersData.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell>{customer.name}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.totalOrders}</TableCell>
              <TableCell>{customer.totalSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Customers;
