"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Customers from "@/components/customers";
import Dashboard from "@/components/dashboard";
import Products from "@/components/products";

const AdminProfile = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const adminData = {
    name: "John Doe",
    email: "john.doe@example.com",
    role: "Super Admin",
  };

  return (
    <div className="container mx-auto p-4">
      <Card className="mb-6">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-20">
            <AvatarImage src="/placeholder-avatar.jpg" alt={adminData.name} />
            <AvatarFallback>
              {adminData.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <CardTitle>{adminData.name}</CardTitle>
            <p className="text-sm text-muted-foreground">{adminData.email}</p>
            <p className="text-sm font-medium">{adminData.role}</p>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Button
              variant={activeSection === "dashboard" ? "default" : "outline"}
              onClick={() => setActiveSection("dashboard")}
            >
              Dashboard
            </Button>
            <Button
              variant={activeSection === "customers" ? "default" : "outline"}
              onClick={() => setActiveSection("customers")}
            >
              Customers
            </Button>
            <Button
              variant={activeSection === "products" ? "default" : "outline"}
              onClick={() => setActiveSection("products")}
            >
              Products
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        {activeSection === "dashboard" && <Dashboard />}
        {activeSection === "customers" && <Customers />}
        {activeSection === "products" && <Products />}
      </div>
    </div>
  );
};

export default AdminProfile;
