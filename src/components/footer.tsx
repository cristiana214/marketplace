/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Send } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-green-900 text-green-100">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h2 className="mb-4 text-2xl font-bold">AgriCBR</h2>
            <p className="mb-4">
              Your one-stop markertplace for the finest locally grown produce.
            </p>
            <img
              src="/agrilogo.png?height=50&width=150"
              alt="agrilogo"
              className="h-12"
            />
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="transition-colors hover:text-green-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/products/"
                  className="transition-colors hover:text-green-300"
                >
                  Products
                </Link>
              </li>

              <li>
                <a
                  href="/about/"
                  className="transition-colors hover:text-green-300"
                >
                  About Us
                </a>
              </li>
              <li>
                <Link
                  href="/farms/"
                  className="transition-colors hover:text-green-300"
                >
                  Farmers
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Us</h3>
            <p>Cabadbaran City, 8605</p>
            <p>Phone: (+63) 9466449212</p>
            <p>Email: agricbr@gmail.com</p>
          </div>

          {/* Newsletter Signup */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Newsletter</h3>
            <p className="mb-2">
              Stay updated with our latest offers and news.
            </p>
            <form className="flex">
              <Input
                type="email"
                placeholder="Your email"
                className="border-green-700 bg-green-800 text-green-100 focus:border-green-500"
              />
              <Button
                type="submit"
                variant="outline"
                size="icon"
                className="ml-2"
              >
                <Send className="size-4" />
                <span className="sr-only">Subscribe</span>
              </Button>
            </form>
          </div>
        </div>

        <div className="mt-8 border-t border-green-800 pt-8">
          <div className="flex items-center justify-between">
            <p>&copy; 2025 AgriCBR. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
