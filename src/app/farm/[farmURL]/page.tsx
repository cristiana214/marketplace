/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import Image from "next/image";

import FarmAvailableCrops from "@/components/farm-available-crops";
import ContactForm from "@/components/contact-form";
import Cards from "@/components/reusable/cards";
import { useSeller } from "@/hooks/query/useSeller";
import FarmTabs from "@/components/farm-tabs";
import { Phone, Mail, TruckIcon } from "lucide-react";

export default function FarmerPage({
  params,
}: {
  params: { farmURL: string };
}) {
  const { data, isLoading, error } = useSeller({
    userUrl: params?.farmURL,
  });
  const user = data?.user;
  return (
    <>
      <title>{user?.displayName}</title>
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
            <h1 className="mb-2 text-center text-3xl font-bold">
              {user?.name}
            </h1>
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
              {user?.email ? (
                <div className="flex items-center">
                  <Mail className="mr-2 size-5" />
                  <span>{user?.email}</span>
                </div>
              ) : null}
            </div>
          </div>
          <div className="md:col-span-2">
            <FarmTabs username={user?.username} userId={user?.userId} />
          </div>
        </div>
        <div className="m-4 grid gap-8 md:grid-cols-2">
          <Cards
            title="Available Crops"
            icon={<TruckIcon className="mr-2 size-6" />}
          >
            <FarmAvailableCrops type="userUrl" url={user?.username} />
          </Cards>

          {/* <Cards title="Contact the Farmer">
            <ContactForm />
          </Cards> */}
        </div>
      </div>
    </>
  );
}
