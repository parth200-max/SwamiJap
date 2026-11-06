import React from "react";
import type { Metadata } from "next";
import AdminHeader from "@/components/admin/AdminHeader";
import ProductTable from "@/components/admin/ProductTable";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import prisma from "@/lib/prisma";
import type { Product } from "@/types";

export const metadata: Metadata = {
  title: "Products Catalog",
  description:
    "Manage Swami Jap bags, stock inventory, INR pricing, and product imagery.",
};

async function getAdminProducts(): Promise<Product[]> {
  try {
    const products = await prisma.product.findMany({
      include: { category: true },
      orderBy: { createdAt: "desc" },
    });

    if (products.length > 0) {
      return products.map((product) => ({
        ...product,
        name: product.title,
        price: Number(product.price),
        compareAt: product.compareAt ? Number(product.compareAt) : null,
        compareAtPrice: product.compareAt
          ? Number(product.compareAt)
          : null,
        stock: product.inventory,
      }));
    }
  } catch {
    // Database offline or not migrated yet; fall back to the curated
    // collection so the admin interface remains previewable.
  }

  return INITIAL_PRODUCTS;
}

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-beige">
      <AdminHeader
        title="Product Catalog"
        subtitle="Manage listings, inventory levels, pricing, and imagery"
      />

      <div className="w-full max-w-7xl p-4 md:p-8">
        <ProductTable initialProducts={products} />
      </div>
    </div>
  );
}
