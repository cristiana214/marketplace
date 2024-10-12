"use client";

import { useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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

export default function FarmerPage(): JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("products");
  return (
    <div className="container mx-auto p-4">
      <div className="mb-8 grid gap-8 md:grid-cols-3">
        <div className="md:col-span-1">
          <Image
            src={farmer.image}
            alt={farmer.name}
            width={300}
            height={300}
            className="mx-auto mb-4 rounded-full"
          />
          <h1 className="mb-2 text-center text-3xl font-bold">{farmer.name}</h1>
          <h2 className="mb-4 text-center text-xl text-gray-600">
            {farmer.farmName}
          </h2>
          <p className="mb-6 text-center">{farmer.bio}</p>
          <div className="mb-6 space-y-2">
            <div className="flex items-center">
              <MapIcon className="mr-2 size-5" />
              <span>{farmer.address}</span>
            </div>
            <div className="flex items-center">
              <Phone className="mr-2 size-5" />
              <span>{farmer.phone}</span>
            </div>
            <div className="flex items-center">
              <Mail className="mr-2 size-5" />
              <span>{farmer.email}</span>
            </div>
          </div>
          <div className="mb-6 flex justify-center space-x-4">
            <a
              href={farmer.socialMedia.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800"
            >
              <Facebook className="size-6" />
            </a>
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
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {products?.map((product) => (
                  <Card key={product.productId}>
                    <CardContent className="p-4">
                      <Image
                        src={product.imageUrl}
                        alt={product.name}
                        width={400}
                        height={200}
                        className="mb-2 rounded-md"
                      />
                      <h3 className="font-semibold">{product.name}</h3>
                      <p className="text-sm text-gray-600">
                        {product?.description || ""}
                      </p>
                      <p className="font-medium">
                        P{product.price.toFixed(2)} / {product.unit}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
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
              <Cards title="Recent Successful Orders">
                <FarmRecentOrders />
              </Cards>
            </TabsContent>

            <TabsContent value="blog">
              <Cards title="Farm Updates">
                <FarmUpdates />
              </Cards>
            </TabsContent>
            <TabsContent value="gallery">
              <Cards title="Farm and Product Gallery">
                <GalleryImage />
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
