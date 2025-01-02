/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-await-in-loop */

"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import TextareaField from "@/components/reusable/textarea-field";
import InputField from "@/components/reusable/input-field";
import { useCategoryTypes } from "@/hooks/query/useCategoryTypes";
import { useCategories } from "@/hooks/query/useCategories";
import ComboCategories from "../combo-categories";
import Combobox from "../reusable/combobox";
// import FileUploadField from "@/component/reusable/file-upload-field";

const schema = z.object({
  product_name: z.string().min(1, " Name is required"),
  description: z.string().min(1, "Description is required"),
  type_id: z.number().int().min(1, "Category Type is required"),
  unit_type_id: z.number().int().min(1, "Unit Type is required"),
  price: z.number().positive("Price must be positive"),
  quantity_available: z.number().positive("Quantity must be positive"),
  images: z.array(z.instanceof(File)), // Image files
});

type FormInput = z.infer<typeof schema>;

const AddProduct = () => {
  const queryClient = useQueryClient();
  const [uploading, setUploading] = useState(false);
  // const categoryTypes = useCategoryTypes();

  const form = useForm<FormInput>({
    resolver: zodResolver(schema),
    defaultValues: {
      product_name: "",
      description: "",
      type_id: undefined,
      unit_type_id: undefined,
      price: 0,
      quantity_available: 0,
      images: [],
    },
  });

  // Fetch options for combobox
  // const { data: unitTypes } = useQuery(["unitTypes"], async () => {
  //   const response = await axios.get("/api/unit-types");
  //   return response.data;
  // });

  // const { data: categoryTypes } = useQuery(["categoryTypes"], async () => {
  //   const response = await axios.get("/api/category-types");
  //   return response.data;
  // });

  const saveProduct = useMutation({
    mutationFn: async (data: any) => {
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
      form.reset(); // Clear the form
      console.log("Product added successfully!");
    },
    onError: () => {
      console.log("Error adding product");
    },
  });

  const uploadImages = async (files: File[]): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of files) {
      const { data } = await axios.post("/api/action/add/product", {
        name: file.name,
      });
      await axios.put(data.url, file);
      uploadedUrls.push(data.key);
    }
    return uploadedUrls;
  };

  const onSubmit = async (formData: FormInput) => {
    setUploading(true);
    try {
      const uploadedUrls = await uploadImages(formData.images);
      const productData = { ...formData, images: uploadedUrls };
      saveProduct.mutate(productData);
    } catch (error) {
      console.error("Error uploading images or saving product:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto mb-5">
      <h1 className="text-xl font-bold">Add Products</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <InputField
          name="name"
          label="name"
          control={form.control}
          type="text"
          error={form.formState.errors?.product_name?.message}
        />
        <TextareaField
          name="description"
          label="Description"
          control={form.control}
          error={form.formState.errors.description?.message}
        />

        <div>
          <Controller
            name="type_id"
            control={form.control}
            render={({ field }) => (
              // <Combobox
              //   items={categoryTypes || []}
              //   selectedItems={field?.value}
              //   onSelect={(value) => field.onChange(value)}
              //   placeholder="Select Category Type"
              //   label="Category Type"
              // />
              <ComboCategories />
            )}
          />
          {form.formState.errors.type_id && (
            <p className="text-sm text-red-500">
              {form.formState.errors.type_id.message}
            </p>
          )}
        </div>

        {/* Unit Type Combobox */}
        <div>
          {/* <Controller
            name="unit_type_id"
            control={form.control}
            render={({ field }) => (
              <Combobox
                options={unitTypes || []}
                value={field.value}
                onChange={(value) => field.onChange(value)}
                placeholder="Select Unit Type"
                label="Unit Type"
              />
            )}
          /> */}
          {/* {form.formState.errors.unit_type_id && (
            <p className="text-sm text-red-500">
              {form.formState.errors.unit_type_id.message}
            </p>
          )} */}
        </div>

        <InputField
          name="price"
          label="Price"
          control={form.control}
          type="number"
          error={form.formState.errors.price?.message}
        />
        <InputField
          name="quantity_available"
          label="Quantity Available"
          control={form.control}
          type="number"
          error={form.formState.errors.quantity_available?.message}
        />
        <div>
          <Controller
            name="images"
            control={form.control}
            render={({ field }) => (
              <input
                type="file"
                multiple
                onChange={(e) =>
                  field.onChange(Array.from(e.target.files || []))
                }
                className="mt-1"
              />
            )}
          />
          {form.formState.errors.images && (
            <p className="text-sm text-red-500">
              {form.formState.errors.images.message}
            </p>
          )}
        </div>
        <Button type="submit" className="mb-7 ">
          {uploading ? "Uploading..." : "Add Product"}
        </Button>
      </form>
    </div>
  );
};

export default AddProduct;
