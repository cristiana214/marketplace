"use client";

import { galleryImages } from "@/lib/data/farm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { useSellerGallery } from "@/hooks/query/useSellerGallery";
import { generateUrl } from "@/lib/helper/generate-url";
import { Button } from "./ui/button";

type Props = { url?: string };
// also known as sub category?

const GalleryImage = ({ url }: Props) => {
  const { data, isLoading, error } = useSellerGallery({ userUrl: url });
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading product images</div>;
  const productImages = data?.productImages;
  if (data?.productImages.length === 0)
    return <div className="mb-4 text-sm">No images available yet.</div>;

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
      {productImages?.map((image, index) => (
        <Dialog key={image.productId + index}>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="aspect-square h-auto w-full overflow-hidden p-0"
            >
              <Image
                src={`https://img-farm.s3.us-west-2.amazonaws.com/product/${generateUrl(image.imageUrl) || `https://img-farm.s3.us-west-2.amazonaws.com/product/image.png`}`}
                alt={image.name}
                width={300}
                height={300}
                className="size-full object-cover transition-transform duration-300 hover:scale-110"
              />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[800px]">
            <Image
              src={`https://img-farm.s3.us-west-2.amazonaws.com/product/${generateUrl(image.imageUrl) || `https://img-farm.s3.us-west-2.amazonaws.com/product/image.png`}`}
              alt={image.name}
              width={800}
              height={600}
              className="h-auto w-full"
            />
            <p className="mt-2 text-center">{image.name}</p>
          </DialogContent>
        </Dialog>
      ))}
    </div>
  );
};
export default GalleryImage;
