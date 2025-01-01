/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Users, Truck, Heart, Info } from "lucide-react";
import WhyChooseUs from "@/components/why-choose-us";

export default function About() {
  return (
    <section>
      <div id="about" className="mx-auto flex w-full max-w-6xl">
        <div className="container">
          <h2 className="text-white-800 mb-8 text-center text-4xl font-bold">
            About AgriCBR
          </h2>
          <div className="flex flex-col items-center justify-between md:flex-row">
            <div className="mb-8 md:mb-0 md:w-1/2">
              <img
                src="/Farm Services.jpg?height=400&width=600"
                alt="Farm landscape"
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2 md:pl-8">
              <p className="mb-4 text-lg">
                AgriCBR is your one-stop agricultural marketplace. We offer a
                wide variety of farm-fresh products straight from the farms. All
                our products are sustainably grown, ensuring both quality and
                freshness in every bite. Experience the best nature has to
                offer, delivered straight to your doorstep.
              </p>
              <p className="mb-4 text-lg">
                Our mission is to support local agriculture and promote
                sustainable farming practices while providing high-quality
                products to our customers.
              </p>
              <div className="flex items-center text-green-700">
                <Info className="mr-2" />
                <span>
                  Established in 2024, serving the community with pride.
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <WhyChooseUs />
    </section>
  );
}
