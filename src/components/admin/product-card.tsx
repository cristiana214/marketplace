import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import type { Product } from "@/types/data";
import { generateUrl } from "@/lib/helper/generate-url";

interface ProductCardProps {
  product: Product;
  onEdit?: () => void;
  onDelete?: () => void;
}

export function ProductCard({ product, onEdit, onDelete }: ProductCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="relative mb-2 aspect-square">
          <Image
            src={`https://img-farm.s3.us-west-2.amazonaws.com/product/${generateUrl(product.imageUrl) || `https://img-farm.s3.us-west-2.amazonaws.com/product/image.png`}`}
            alt={product.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
        <h3 className="font-semibold">{product.name}</h3>
        <p className="text-sm text-muted-foreground">
          P{product.price.toFixed(2)}
        </p>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline" size="sm" onClick={onEdit}>
          Edit
        </Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
}
