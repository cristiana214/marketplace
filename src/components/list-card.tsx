import { products } from "@/lib/data/farm";
import Image from "next/image";
import { Card } from "@/components/ui/card";

const ListCard = () => (
  <>
    {products
      .sort(() => Math.random() - 0.5)
      .map((card, index) => (
        <Card
          key={index}
          className="w-full p-4 text-gray-700 hover:bg-slate-100 dark:text-gray-200 dark:hover:bg-gray-800"
        >
          <div className="m-4">
            <h2 className="text-lg font-bold">{card.name}</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {card.description}
            </p>
          </div>
          <Image
            className="rounded-lg border border-gray-200 dark:border-gray-700"
            src={card.imageUrl}
            alt={card.name}
            width={400}
            height={380}
          />
        </Card>
      ))}
  </>
);

export default ListCard;
