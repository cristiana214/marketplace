"use client";

import { useSellers } from "@/hooks/query/useSellers";
import { generateUrl } from "@/lib/helper/generate-url";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { Phone, Mail, MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";
import { Card, CardContent, CardTitle } from "./ui/card";

const ListSellers = () => {
  const { data, isLoading, error } = useSellers();
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading categories</div>;
  const sellers = data?.users;

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {sellers?.map((seller) => (
        <Card key={seller.userId}>
          <CardContent className="pt-4 ">
            <div className="mb-4 flex items-center space-x-4">
              <Avatar className="size-12">
                <AvatarImage
                  src={
                    seller?.imageUrl
                      ? `https://img-farm.s3.us-west-2.amazonaws.com/user/${seller.imageUrl}`
                      : "https://img-farm.s3.us-west-2.amazonaws.com/user/profile.jpg"
                  }
                  alt={seller.displayName}
                />
                <AvatarFallback>{seller?.name}</AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{seller?.displayName}</CardTitle>
                <p className="mt-1 text-sm text-gray-500">
                  {" "}
                  {seller?.about?.split(" ").slice(0, 14).join(" ")}
                  ...
                </p>
              </div>
            </div>
            <div className="space-y-1">
              {seller?.contact ? (
                <div className="flex items-center">
                  <Phone className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.contact}</p>
                </div>
              ) : (
                false
              )}
              {seller?.email ? (
                <div className="flex items-center">
                  <Mail className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.email}</p>
                </div>
              ) : (
                false
              )}
              {seller?.location ? (
                <div className="flex items-center">
                  <MapPin className="mr-2 size-4 text-gray-500" />
                  <p className="text-sm">{seller?.location}</p>
                </div>
              ) : (
                false
              )}
            </div>
            <Link href={`/farm/${generateUrl(seller.username)}`}>
              <Button className="w-full" variant="outline">
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
