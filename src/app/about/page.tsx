/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Truck, Heart } from "lucide-react";

const features = [
  {
    icon: <Leaf className="size-6" />,
    title: "Fresh Local Produce",
    description:
      "We source the freshest fruits and vegetables directly from Cabadbaranon farmers.",
  },
  {
    icon: <Users className="size-6" />,
    title: "Supporting Local Communities",
    description:
      "Our marketplace empowers small-scale farmers and strengthens local economies.",
  },
  {
    icon: <Truck className="size-6" />,
    title: "Farm-to-Table ",
    description:
      "We ensure quick and efficient ordering process to maintain produce freshness.",
  },
  {
    icon: <Heart className="size-6" />,
    title: "Promoting Healthy Living",
    description:
      "We encourage healthier lifestyles by providing access to nutritious, local foods.",
  },
];

const teamMembers = [
  {
    name: "IC Marie T. Chavez",
    role: "Web Developer",
    image: "/placeholder.svg?height=200&width=200",
  },
];

export default function AboutUs() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-center text-4xl font-bold">
        About Agri CBR Farm Marketplace
      </h1>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Our Mission</h2>
        <p className="mb-4 text-lg">
          Agri CBR Farm Marketplace is dedicated to connecting Cabadbaranon
          farmers with consumers, promoting sustainable agriculture, and
          providing fresh, locally-sourced produce to households across City of
          Cabadbaran. We believe in supporting local communities and fostering a
          healthier, more connected food ecosystem.
        </p>
        <Image
          src="https://img-farm.s3.us-west-2.amazonaws.com/extra/farming.png"
          alt="Filipino farmers in a lush green field"
          width={800}
          height={400}
          className="mb-4 rounded-lg shadow-md"
        />
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">What We Offer</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  {feature.icon}
                  <span className="ml-2">{feature.title}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">Our Story</h2>
        <p className="mb-4 text-lg">
          Founded in 2024, Agri CBR Farm Marketplace was born out of a passion
          for supporting local agriculture and improving access to fresh,
          high-quality produce. Our journey began in the rice fields of Central
          Luzon, where we witnessed firsthand the challenges faced by
          small-scale farmers in bringing their produce to market.
        </p>
        <p className="mb-4 text-lg">
          Inspired by the resilience and dedication of these farmers, we set out
          to create a platform that would bridge the gap between producers and
          consumers. Today, we work with hundreds of farmers across City of
          Cabadbaran, bringing the best of local agriculture to thousands of
          households.
        </p>
      </section>

      {/* <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {teamMembers.map((member, index) => (
            <Card key={index}>
              <CardContent className="flex flex-col items-center p-4">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={200}
                  height={200}
                  className="rounded-full mb-4"
                />
                <h3 className="text-xl font-semibold">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section> */}

      <section className="mb-12">
        <h2 className="mb-4 text-2xl font-semibold">
          Our Commitment to Sustainability
        </h2>
        <p className="mb-4 text-lg">
          At Agri CBR Farm Marketplace, we're committed to promoting sustainable
          farming practices and reducing our environmental impact. We work
          closely with our partner farmers to implement eco-friendly growing
          methods, minimize pesticide use, and reduce food waste throughout our
          supply chain.
        </p>
        <p className="mb-4 text-lg">
          We also prioritize the use of biodegradable packaging and are
          constantly exploring new ways to make our operations more
          environmentally friendly.
        </p>
      </section>

      <section className="text-center">
        <h2 className="mb-4 text-2xl font-semibold">Join Our Community</h2>
        <p className="mb-6 text-lg">
          Whether you're a farmer looking to expand your reach or a consumer
          passionate about supporting local agriculture, we invite you to join
          our growing community.
        </p>
        <div className="flex justify-center gap-4">
          <Button size="lg">For Farmers</Button>
          <Button size="lg" variant="outline">
            For Consumers
          </Button>
        </div>
      </section>
    </div>
  );
}
