"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useSellerStats } from "@/hooks/query/useSellerStats";
import { BarChart3, Users, Sprout, ShoppingCart } from "lucide-react";
import { useSession } from "next-auth/react";

export default function AdminDashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data, isLoading, isError } = useSellerStats({
    userId: user?.userId || 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching stats.</div>;
  return (
    <div className="container mx-auto px-4">
      <h3 className="mb-4 text-xl font-semibold">Admin Dashboard</h3>
      <div className="grid gap-6  p-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Products
            </CardTitle>
            <Sprout className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalProducts || 0}
            </div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalCountOrders}
            </div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <BarChart3 className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">P{data?.stats?.totalSales}</div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Order list will be displayed here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Product list will be displayed here</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
