import { CheckCircle, Truck, Users, Leaf } from "lucide-react";

export default function WhyChooseUs() {
  const reasons = [
    {
      icon: CheckCircle,
      title: "Quality Assurance",
      description: "Rigorous quality checks for all products",
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Same-day delivery for local customers",
    },
    {
      icon: Users,
      title: "Community Support",
      description: "Supporting local farmers and economies",
    },
    {
      icon: Leaf,
      title: "Eco-Friendly",
      description: "Committed to sustainable farming practices",
    },
  ];

  return (
    <section id="why-choose-us" className=" py-20">
      <h2 className="text-white-800 mb-12 text-center text-4xl font-bold">
        Why Choose Us
      </h2>
      <div className="mx-auto flex w-full max-w-6xl">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <div key={index} className="text-center">
              <reason.icon className="mx-auto mb-4 size-12 text-green-600" />
              <h3 className="mb-2 text-xl font-semibold">{reason.title}</h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
