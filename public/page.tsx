"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
// import { toast } from "@/hooks/use-toast";

// Define the schema for form validation
const productSchema = z.object({
  seller_id: z.string().min(1, "Seller is required"),
  type_id: z.string().min(1, "Category is required"),
  name: z.string().min(3, "Name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().positive("Price must be positive"),
  quantity_available: z
    .number()
    .int()
    .positive("Quantity must be a positive integer"),
  unit_type_id: z.string().min(1, "Unit type is required"),
  image: z.instanceof(File).optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

// Mock API calls (replace with actual API calls)
const fetchSellers = async () => {
  // Simulated API call
  return [
    { id: "1", name: "Farmer John" },
    { id: "2", name: "Farmer Jane" },
  ];
};

const fetchCategories = async () => {
  // Simulated API call
  return [
    { id: "1", name: "Vegetables" },
    { id: "2", name: "Fruits" },
  ];
};

const fetchUnitTypes = async () => {
  // Simulated API call
  return [
    { id: "1", name: "kg" },
    { id: "2", name: "liters" },
    { id: "3", name: "pieces" },
  ];
};

const addProduct = async (data: ProductFormData) => {
  // Simulated API call
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Product added:", data);
  return { id: Date.now().toString(), ...data };
};

export default function AddFarmProduct() {
  const [products, setProducts] = useState<ProductFormData[]>([]);
  const queryClient = useQueryClient();

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      seller_id: "",
      type_id: "",
      name: "",
      description: "",
      price: 0,
      quantity_available: 0,
      unit_type_id: "",
    },
  });

  const { data: sellers } = useQuery(["sellers"], fetchSellers);
  const { data: categories } = useQuery(["categories"], fetchCategories);
  const { data: unitTypes } = useQuery(["unitTypes"], fetchUnitTypes);

  const addProductMutation = useMutation(addProduct, {
    onSuccess: (data) => {
      setProducts((prev) => [...prev, data]);
      queryClient.invalidateQueries(["products"]);
      reset();
      toast({
        title: "Product added successfully",
        description: `${data.name} has been added to the product list.`,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to add product. Please try again.",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ProductFormData) => {
    addProductMutation.mutate(data);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Add Farm Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="seller_id">Seller</Label>
          <Controller
            name="seller_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a seller" />
                </SelectTrigger>
                <SelectContent>
                  {sellers?.map((seller) => (
                    <SelectItem key={seller.id} value={seller.id}>
                      {seller.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.seller_id && (
            <p className="text-red-500">{errors.seller_id.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="type_id">Category</Label>
          <Controller
            name="type_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.type_id && (
            <p className="text-red-500">{errors.type_id.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="name">Name</Label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => <Input {...field} />}
          />
          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>

        <div>
          <Label htmlFor="description">Description</Label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => <Textarea {...field} />}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="price">Price</Label>
          <Controller
            name="price"
            control={control}
            render={({ field }) => (
              <Input {...field} type="number" step="0.01" />
            )}
          />
          {errors.price && (
            <p className="text-red-500">{errors.price.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="quantity_available">Quantity Available</Label>
          <Controller
            name="quantity_available"
            control={control}
            render={({ field }) => <Input {...field} type="number" />}
          />
          {errors.quantity_available && (
            <p className="text-red-500">{errors.quantity_available.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="unit_type_id">Unit Type</Label>
          <Controller
            name="unit_type_id"
            control={control}
            render={({ field }) => (
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a unit type" />
                </SelectTrigger>
                <SelectContent>
                  {unitTypes?.map((unitType) => (
                    <SelectItem key={unitType.id} value={unitType.id}>
                      {unitType.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
          {errors.unit_type_id && (
            <p className="text-red-500">{errors.unit_type_id.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="image">Product Image</Label>
          <Input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) {
                // Handle file upload to AWS S3 here
                console.log("File to upload:", file);
              }
            }}
          />
        </div>

        <Button type="submit" disabled={addProductMutation.isLoading}>
          {addProductMutation.isLoading ? "Adding..." : "Add Product"}
        </Button>
      </form>

      <h2 className="text-xl font-bold mt-8 mb-4">Added Products</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product, index) => (
          <div key={index} className="border p-4 rounded-md">
            <h3 className="font-bold">{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity_available}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
