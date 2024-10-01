import type { Farmer } from "@/types/data";

interface FarmLocationProps {
  mapUrl: Farmer["mapUrl"];
}
const FarmLocation = ({ mapUrl }: FarmLocationProps) => (
  <div className="aspect-video">
    <iframe
      title="Embedded farm location"
      src={mapUrl}
      width="100%"
      height="100%"
      frameBorder="0"
      scrolling="no"
      marginHeight={0}
      marginWidth={0}
    />
  </div>
);
export default FarmLocation;
