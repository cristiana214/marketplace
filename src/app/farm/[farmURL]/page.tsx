"use client";

import { useState } from "react";
import Image from "next/image";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MapIcon, Phone, Mail, TruckIcon, Facebook } from "lucide-react";
import { farmer, products } from "@/lib/data/farm";
import GalleryImage from "@/components/gallery-image";
import FarmAvailableCrops from "@/components/farm-available-crops";
import FarmUpcomingHarvest from "@/components/farm-upcoming-harvest";
import FarmLocation from "@/components/farm-location";
import FarmRecentOrders from "@/components/farm-recent-orders";
import FarmUpdates from "@/components/farm-updates";
import ContactForm from "@/components/contact-form";
import Cards from "@/components/reusable/cards";
import ListProducts from "@/components/list-products";
import { useSeller } from "@/hooks/query/useSeller";
import ListOrders from "@/components/admin/list-seller-orders";

export default function FarmerPage({
  params,
}: {
  params: { farmURL: string };
}) {
  const { data, isLoading, error } = useSeller({
    userUrl: params?.farmURL,
  });
  const user = data?.user;
  const [activeTab, setActiveTab] = useState<string>("products");
  return (
    <div className="container mx-auto w-10/12 p-4">
      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Image
            src={
              user?.image ||
              "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
            }
            alt={user?.name || ""}
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="mb-2 text-center text-3xl font-bold">{user?.name}</h1>
          <h2 className="mb-4 text-center text-xl text-gray-600">
            {user?.displayName}
          </h2>
          <p className="mb-6 text-center">{user?.about}</p>
          <div className="mb-6 space-y-2">
            {/* <div className="flex items-center">
              <MapIcon className="mr-2 size-5" />
              <span>{farmer.address}</span>
            </div> */}
            {user?.contact ? (
              <div className="flex items-center">
                <Phone className="mr-2 size-5" />
                <span>{user?.contact}</span>
              </div>
            ) : (
              false
            )}
            <div className="flex items-center">
              <Mail className="mr-2 size-5" />
              <span>{user?.email}</span>
            </div>
          </div>
        </div>
        <div className="md:col-span-2">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
              <TabsTrigger value="products">Products</TabsTrigger>
              <TabsTrigger value="harvests">Harvests</TabsTrigger>
              <TabsTrigger value="map">Location</TabsTrigger>
              <TabsTrigger value="orders">Orders</TabsTrigger>
              <TabsTrigger value="blog">Blog</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="products">
              <ListProducts
                type="userUrl"
                url={user?.username}
                className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-2"
              />
            </TabsContent>
            <TabsContent value="harvests">
              <Cards title="Upcoming Harvests">
                <FarmUpcomingHarvest />
              </Cards>
            </TabsContent>
            <TabsContent value="map">
              <Cards title="Farm Location">
                <FarmLocation mapUrl={farmer.mapUrl} />
              </Cards>
            </TabsContent>
            <TabsContent value="orders">
              <Cards title="Recent Orders">
                {/* <FarmRecentOrders /> */}
                <ListOrders type="sellerId" id={user?.userId} />
              </Cards>
            </TabsContent>

            <TabsContent value="blog">
              <Cards title="Farm Updates">
                <FarmUpdates />
              </Cards>
            </TabsContent>
            <TabsContent value="gallery">
              <Cards title="Farm and Product Gallery">
                <GalleryImage url={user?.username} />
              </Cards>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Cards
          title="Available Crops"
          icon={<TruckIcon className="mr-2 size-6" />}
        >
          <FarmAvailableCrops />
        </Cards>

        <Cards title="Contact the Farmer">
          <ContactForm />
        </Cards>
      </div>
    </div>
  );
}
