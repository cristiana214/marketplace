import { availableCrops } from "@/lib/data/farm";
import { Sprout } from "lucide-react";

const FarmAvailableCrops = () => (
  <ul className="grid grid-cols-2 gap-2">
    {availableCrops.map((crop, index) => (
      <li key={index} className="flex items-center">
        <Sprout className="mr-2 size-4" />
        {crop}
      </li>
    ))}
  </ul>
);
export default FarmAvailableCrops;
