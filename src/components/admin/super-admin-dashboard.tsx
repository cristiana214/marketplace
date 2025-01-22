"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAdminStats } from "@/hooks/query/useAdminStats";
import { Sprout, ShoppingCart, BarChart3 } from "lucide-react";
import { useSession } from "next-auth/react";

export default function SuperAdminDashboard() {
  const { data: session } = useSession();
  const user = session?.user;
  const { data, isLoading, isError } = useAdminStats({
    userId: user?.userId || 0,
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching stats.</div>;
  if (user?.userType !== 4)
    return (
      <div className="container mx-auto mb-4 px-4 text-xl font-semibold">
        Unauthorized
      </div>
    );
  return (
    <div className="container mx-auto px-4">
      <h3 className="mb-4 text-xl font-semibold">Super Admin Dashboard</h3>
      <div className="grid gap-6  p-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Users signups
            </CardTitle>
            <Sprout className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalUserSignups || 0}
            </div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Sellers</CardTitle>
            <Sprout className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalSellers || 0}
            </div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Sprout className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data?.stats?.totalUsers || 0}
            </div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total products ordered
            </CardTitle>
            <ShoppingCart className="size-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data?.stats?.totalOrders}</div>
            <p className="text-xs text-muted-foreground" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Count of Orders
            </CardTitle>
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
            <CardTitle className="text-sm font-medium">
              Total Overall Revenue
            </CardTitle>
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
            <CardTitle>Top Sellers</CardTitle>
          </CardHeader>
          <CardContent>
            <p>top seller list here</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Top Selling Products</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Top products displayed</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
