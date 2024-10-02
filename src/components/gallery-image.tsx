"use client";

import { galleryImages } from "@/lib/data/farm";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Button } from "./ui/button";

const GalleryImage = () => (
  <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
    {galleryImages.map((image) => (
      <Dialog key={image.id}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            className="aspect-square h-auto w-full overflow-hidden p-0"
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="size-full object-cover transition-transform duration-300 hover:scale-110"
            />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[800px]">
          <Image
            src={image.src}
            alt={image.alt}
            width={800}
            height={600}
            className="h-auto w-full"
          />
          <p className="mt-2 text-center">{image.alt}</p>
        </DialogContent>
      </Dialog>
    ))}
  </div>
);
export default GalleryImage;
