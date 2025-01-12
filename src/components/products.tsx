import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const productsData = [
  {
    id: 1,
    name: "Product A",
    category: "Electronics",
    price: "$199",
    stock: 50,
  },
  { id: 2, name: "Product B", category: "Clothing", price: "$49", stock: 100 },
  {
    id: 3,
    name: "Product C",
    category: "Home & Garden",
    price: "$79",
    stock: 30,
  },
  {
    id: 4,
    name: "Product D",
    category: "Electronics",
    price: "$299",
    stock: 20,
  },
  { id: 5, name: "Product E", category: "Clothing", price: "$59", stock: 80 },
];

const Products = () => (
  <Card>
    <CardHeader>
      <CardTitle>Product List</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {productsData.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>{product.price}</TableCell>
              <TableCell>{product.stock}</TableCell>
              <TableCell>
                <Badge variant={product.stock > 0 ? "success" : "destructive"}>
                  {product.stock > 0 ? "In Stock" : "Out of Stock"}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
);

export default Products;
