"use client";

import Link from "next/link";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Plus, Minus } from "lucide-react";
import { GridItemEight, GridItemFour, GridLayout } from "@/components/ui/grid";
import { productFarmer as product, productFarmer } from "@/lib/data/product";
// import { comments } from "@/lib/data/comments";
import Cards from "@/components/reusable/cards";

export default function ItemPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [newComment, setNewComment] = useState("");

  const handleAddToCart = () => {
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("New comment:", newComment);
    setNewComment("");
  };
  return (
    <GridLayout>
      <GridItemEight>
        <div className="relative mb-4 aspect-square">
          <Image
            src={product?.images[activeImage]}
            alt={product.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex gap-4 overflow-x-auto">
          {product?.images.map((image, index) => (
            <button
              type="button"
              key={index}
              onClick={() => setActiveImage(index)}
              className={`relative size-24 overflow-hidden rounded-md ${
                index === activeImage ? "ring-2 ring-primary" : ""
              }`}
            >
              <Image
                src={image}
                alt={`${productFarmer.name} thumbnail ${index + 1}`}
                layout="fill"
                objectFit="cover"
              />
            </button>
          ))}
        </div>

        <div className="mt-12">
          <h2 className="mb-4 text-2xl font-bold">Customer Reviews</h2>
          {/* <div className="mb-8 space-y-4">
            {comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="pt-4">
                  <div className="mb-2 flex items-center gap-2">
                    <Avatar>
                      <AvatarFallback>{comment.user[0]}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{comment.user}</span>
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`size-4 ${i < comment.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p>{comment.content}</p>
                </CardContent>
              </Card>
            ))}
          </div> */}
          <form onSubmit={handleSubmitComment}>
            <h3 className="mb-2 text-xl font-semibold">Leave a Comment</h3>
            <Textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Write your comment here..."
              className="mb-4"
            />
            <Button type="submit">Submit Comment</Button>
          </form>
        </div>
      </GridItemEight>
      <GridItemFour>
        <h1 className="mb-4 text-3xl font-bold">{product.name}</h1>
        <p className="mb-4 text-2xl font-semibold">
          P{product.price.toFixed(2)} / {product.unit}
        </p>
        <p className="mb-4">{product.description}</p>
        <div className="mb-4 flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Minus className="size-4" />
          </Button>
          <span className="text-xl font-semibold">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(quantity + 1)}
          >
            <Plus className="size-4" />
          </Button>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </div>
        <Tabs defaultValue="farmer">
          <TabsList>
            <TabsTrigger value="farmer">Farmer Profile</TabsTrigger>
            <TabsTrigger value="more-info">Description</TabsTrigger>
          </TabsList>
          <TabsContent value="more-info">
            <Cards title="Description">
              <>
                <p>Serving Size: {product.nutritionFacts.servingSize}</p>
                <p>Calories: {product.nutritionFacts.calories}</p>
                <p>Total Fat: {product.nutritionFacts.totalFat}</p>
                <p>Sodium: {product.nutritionFacts.sodium}</p>
                <p>
                  Total Carbohydrate: {product.nutritionFacts.totalCarbohydrate}
                </p>
                <p>Protein: {product.nutritionFacts.protein}</p>
              </>
            </Cards>
          </TabsContent>
          <TabsContent value="farmer">
            <Cards title={product.farmer.name}>
              <div className="mb-4 flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarImage
                    src={product.farmer.image}
                    alt={product.farmer.name}
                  />
                  <AvatarFallback>
                    {product.farmer.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <Link href={`/farm/${product.farmer.url}/`}>
                    <h3 className="font-semibold">{product.farmer.farmName}</h3>{" "}
                  </Link>
                  <p>{product.farmer.bio}</p>
                </div>
              </div>
            </Cards>
          </TabsContent>
        </Tabs>
      </GridItemFour>
    </GridLayout>
  );
}
