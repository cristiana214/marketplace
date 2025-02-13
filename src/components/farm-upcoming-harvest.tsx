import { upcomingHarvests } from "@/lib/data/farm";
import { Calendar } from "lucide-react";

const FarmUpcomingHarvest = () => (
  <div className="flex items-center space-y-2">
    <Calendar className="mr-2 size-5" />
    <span>No upcoming harvests yet</span>
  </div>
);
// return(
// <ul className="space-y-2">
//   {upcomingHarvests.map((harvest, index) => (
//     <li key={index} className="flex items-center">
//       <Calendar className="mr-2 size-5" />
//       <span>
//         {harvest.crop} - {harvest.date}
//       </span>
//     </li>
//   ))}
// </ul>
export default FarmUpcomingHarvest;
