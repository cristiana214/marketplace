"use client";

import { useSellers } from "@/hooks/query/useSellers";
import { generateUrl } from "@/lib/helper/generate-url";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";
import FarmersSkeleton from "./loading/famers";

const ListSellers = () => {
  const { data, isLoading, error } = useSellers();
  if (isLoading) return <FarmersSkeleton />;
  if (error) return <div>Error loading categories</div>;
  const sellers = data?.users;

  return (
    <div className="grid grid-cols-1 gap-6 p-4 sm:grid-cols-2 lg:grid-cols-3">
      {sellers?.map((seller) => (
        <Card key={seller.userId} className="p-4">
          <CardContent className="pt-4">
            <div className="mb-4 flex items-center space-x-4">
              <Avatar className="size-12 shrink-0 rounded-full">
                <AvatarImage
                  src={
                    seller?.image
                      ? `${seller.image}`
                      : "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
                  }
                  alt={seller.displayName}
                  className="rounded-full"
                />
                <AvatarFallback>{seller?.name}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{seller?.displayName}</CardTitle>
                <p className="mt-1 text-sm text-gray-500">
                  {seller?.about?.split(" ").slice(0, 14).join(" ")}...
                </p>
              </div>
            </div>
            <div className="space-y-2">
              {seller?.contact && (
                <div className="flex items-center">
                  <Phone className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.contact}</p>
                </div>
              )}
              {seller?.email && (
                <div className="flex items-center">
                  <Mail className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.email}</p>
                </div>
              )}
              {seller?.location && (
                <div className="flex items-center">
                  <MapPin className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.location}</p>
                </div>
              )}
            </div>
            <Link href={`/farm/${generateUrl(seller.username || "")}`}>
              <Button className="mt-4 w-full" variant="outline">
                View Products
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
export default ListSellers;
