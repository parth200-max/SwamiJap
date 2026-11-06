import React from "react";
import type { Metadata } from "next";
import CollectionsClient from "@/components/storefront/CollectionsClient";

export const metadata: Metadata = {
  title: "All Collections | Swami Jap",
  description:
    "Explore our complete collection of structured totes, compact sling bags, commuter laptop bags, pouches, and handcrafted accessories.",
};

export default function CollectionsPage() {
  return (
    <div className="bg-ivory min-h-screen pt-24 sm:pt-28 pb-16 sm:pb-24">
      <div className="container-page">
        <CollectionsClient />
      </div>
    </div>
  );
}
