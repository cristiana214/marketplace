/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextareaField from "@/components/reusable/textarea-field";
import InputField from "@/components/reusable/input-field";
import type { ComboboxItem } from "@/lib/data/unitTypes";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import ImageUploader from "@/components/reusable/image-uploader";
import { redirect } from "next/navigation";
import ComboUnitTypes from "@/components/combo-unit-types";
import ComboCategories from "@/components/combo-categories";
import ComboCategoryTypes from "@/components/combo-category-types";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";

const schema = z.object({
  product_name: z.string().min(1, " Name is required"),
  description: z.string().min(1, "Description is required"),
  type_id: z.number().int().min(1, "Category Type is required"),
  category_id: z.number().int().min(1, "Category id is required"),
  unit_type_id: z.number().int().min(1, "Unit Type is required"),
  price: z.number().positive("Price must be positive"),
  quantity_available: z.number().positive("Quantity must be positive"),
  // images: z.array(z.instanceof(File)), // Image files
});

type FormInput = z.infer<typeof schema>;

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [images, setImages] = useState<string[]>([]);
  const [selectedCategoryItems, setSelectedCategoryItems] = useState<
    ComboboxItem[]
  >([]);
  const [selectedCategoryTypeItems, setSelectedCategoryTypeItems] = useState<
    ComboboxItem[]
  >([]);
  const [selectedUnitTypeItems, setSelectedUnitTypeItems] = useState<
    ComboboxItem[]
  >([]);
  // const categoryTypes = useCategoryTypes();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: "",
      description: "",
      category_id: undefined,
      type_id: undefined,
      unit_type_id: undefined,
      price: 0,
      quantity_available: 0,
      // images: [],
    },
  });

  const saveProduct = useMutation({
    mutationFn: async (data: FormInput) => {
      const response = await fetch("/api/action/add/product/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to save product");
      return response.json();
    },
    onSuccess: () => {
      // queryClient.invalidateQueries(["products"]);
      form.reset(); // clear the form
      toast.success("Product added successfully!!");
      redirect("/admin/products/");
    },
    onError: () => {
      console.error("Error adding product");
    },
  });

  const onSubmit = async (formData: FormInput) => {
    setUploading(true);
    try {
      // const productData = { ...formData, images: uploadedUrls };
      const productData = { ...formData, images };
      saveProduct.mutate(productData);
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Card className="my-8 w-6/12">
      <CardHeader>
        <CardTitle>Add New Product</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <InputField
              name="product_name"
              label="Product Name"
              control={form.control}
              type="text"
              error={form.formState.errors?.product_name?.message}
            />
          </div>
          <TextareaField
            name="description"
            label="Description"
            control={form.control}
            error={form.formState.errors.description?.message}
          />
          <div className="flex items-center space-y-2 ">
            <Label htmlFor="category_id" className="mr-4">
              Category:
            </Label>
            <Controller
              name="category_id"
              control={form.control}
              render={({ field }) => (
                <ComboCategories
                  selectedItems={selectedCategoryItems} // pass the state
                  onSelect={(selected) => {
                    setSelectedCategoryItems(selected); // update state
                    field.onChange(selected[0]?.id); // update form value
                    form.setValue("type_id", 0); // reset category type when category changes
                    setSelectedCategoryTypeItems([]);
                  }}
                />
              )}
            />
            {form.formState.errors.type_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.type_id.message}
              </p>
            )}

            <Label htmlFor="type_id" className="ml-8 mr-4">
              Category Type:{" "}
            </Label>
            <Controller
              name="type_id"
              control={form.control}
              render={({ field }) => (
                <ComboCategoryTypes
                  selectedItems={selectedCategoryTypeItems} // pass the state
                  onSelect={(selected) => {
                    setSelectedCategoryTypeItems(selected); // update state
                    field.onChange(selected[0]?.id); // update form value
                  }}
                  categoryUrl={selectedCategoryItems[0]?.url || ""}
                />
              )}
            />
            {form.formState.errors.type_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.type_id.message}
              </p>
            )}
          </div>

          {/* Unit Type Combobox */}
          <div className="flex items-center space-y-2 ">
            <Label htmlFor="type_id" className=" mr-4">
              Unit Type:{" "}
            </Label>
            <Controller
              name="unit_type_id"
              control={form.control}
              render={({ field }) => (
                <ComboUnitTypes
                  selectedItems={selectedUnitTypeItems}
                  onSelect={(selected) => {
                    setSelectedUnitTypeItems(selected); // update state
                    field.onChange(selected[0]?.id); // update form value
                  }}
                />
              )}
            />
            {form.formState.errors.unit_type_id && (
              <p className="text-sm text-red-500">
                {form.formState.errors.unit_type_id.message}
              </p>
            )}
          </div>
          <div className="flex items-center ">
            <InputField
              name="price"
              label="Price"
              control={form.control}
              type="number"
              error={form.formState.errors.price?.message}
            />
            <InputField
              className="ml-6 mr-4"
              name="quantity_available"
              label="Quantity Available"
              control={form.control}
              type="number"
              error={form.formState.errors.quantity_available?.message}
            />
          </div>
          <ImageUploader setImages={setImages} images={images} />
          <Button
            type="submit"
            className="mb-7 "
            disabled={images.length === 0}
          >
            {uploading ? "Saving..." : "Add Product"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AddProduct;
