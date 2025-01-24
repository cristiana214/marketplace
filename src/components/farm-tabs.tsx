/* eslint-disable react/jsx-no-undef */

"use client";

import { farmer } from "@/lib/data/farm";
import { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import type { User } from "next-auth";
import ListOrders from "@/components/admin/list-seller-orders";
import FarmLocation from "@/components/farm-location";
import FarmUpcomingHarvest from "@/components/farm-upcoming-harvest";
import GalleryImage from "@/components/gallery-image";
import ListProducts from "@/components/list-products";
import Cards from "@/components/reusable/cards";

type FarmTabsProps = {
  username?: User["username"];
  userId?: User["userId"];
};
const FarmTabs = ({ username, userId }: FarmTabsProps) => {
  const [activeTab, setActiveTab] = useState<string>("products");
  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList className="flex h-full flex-wrap justify-center gap-2  lg:grid lg:w-full lg:grid-cols-7">
        <TabsTrigger value="products">Products</TabsTrigger>
        <TabsTrigger value="harvests">Harvests</TabsTrigger>
        <TabsTrigger value="map">Location</TabsTrigger>
        <TabsTrigger value="orders">Orders</TabsTrigger>
        {/* <TabsTrigger value="blog">Blog</TabsTrigger> */}
        <TabsTrigger value="gallery">Gallery</TabsTrigger>
      </TabsList>
      <TabsContent value="products">
        <ListProducts
          type="userUrl"
          url={username}
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
          <ListOrders type="sellerId" id={userId} />
        </Cards>
      </TabsContent>

      {/* <TabsContent value="blog">
              <Cards title="Farm Updates">
                <FarmUpdates />
              </Cards>
            </TabsContent> */}
      <TabsContent value="gallery">
        <Cards title="Farm and Product Gallery">
          <GalleryImage url={username} />
        </Cards>
      </TabsContent>
    </Tabs>
  );
};
export default FarmTabs;
