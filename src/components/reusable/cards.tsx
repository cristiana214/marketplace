// https://ui.shadcn.com/docs/components/card
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface CardProps {
  title: string;
  icon?: React.ReactNode; // Optional icon to display alongside the title
  children: React.ReactNode; // Content of the card
  className?: string; // Additional custom classes
}

const Cards = ({ title, icon, children, className = "" }: CardProps) => (
  <Card className={`${className}`}>
    <CardHeader>
      <CardTitle className="flex items-center">
        {icon && <span className="mr-2 size-6">{icon}</span>}
        {/* <TruckIcon className="mr-2 size-6" /> */}
        {title}
      </CardTitle>
    </CardHeader>
    <CardContent>{children}</CardContent>
  </Card>
);

export default Cards;
