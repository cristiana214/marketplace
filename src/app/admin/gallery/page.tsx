/* eslint-disable @next/next/no-img-element */

"use client";

import GalleryImage from "@/components/gallery-image";
import { useSession } from "next-auth/react";

const OrderInprogressPage = () => {
  const { data: session } = useSession();
  const user = session?.user;

  return (
    <div className="container mx-auto px-4 py-8">
      <h3 className="mb-4 text-xl font-semibold">Image Gallery</h3>
      <GalleryImage url={user?.username} />{" "}
    </div>
  );
};

export default OrderInprogressPage;
