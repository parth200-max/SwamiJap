import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  IndianRupee,
  Package,
  ShoppingBag,
  TrendingUp,
  Truck,
} from "lucide-react";
import AdminHeader from "@/components/admin/AdminHeader";
import StatsCard from "@/components/admin/StatsCard";
import Badge from "@/components/ui/Badge";
import { buttonStyles } from "@/lib/button-styles";
import { INITIAL_PRODUCTS } from "@/lib/products-data";
import { cn } from "@/lib/cn";

export const metadata: Metadata = {
  title: "Admin Dashboard",
  description:
    "Overview of Swami Jap orders, revenue, inventory, and storefront performance.",
};

const recentOrders = [
  {
    id: "SJ-2601",
    customer: "Ananya Sharma",
    city: "Mumbai, MH",
    product: "Everyday Structured Tote",
    amount: 4499,
    status: "PROCESSING",
    date: "Today, 11:30 AM",
  },
  {
    id: "SJ-2600",
    customer: "Rohan Mehra",
    city: "Bengaluru, KA",
    product: "Commuter Laptop Bag",
    amount: 5999,
    status: "SHIPPED",
    date: "Today, 09:15 AM",
  },
  {
    id: "SJ-2599",
    customer: "Priya Patel",
    city: "Ahmedabad, GJ",
    product: "Crescent Sling Bag",
    amount: 2799,
    status: "DELIVERED",
    date: "Yesterday",
  },
  {
    id: "SJ-2598",
    customer: "Siddharth Nair",
    city: "New Delhi, DL",
    product: "Weekend Duffel Bag",
    amount: 6499,
    status: "SHIPPED",
    date: "Yesterday",
  },
  {
    id: "SJ-2597",
    customer: "Neha Kapoor",
    city: "Pune, MH",
    product: "Mini Everyday Belt Bag",
    amount: 2199,
    status: "DELIVERED",
    date: "24 Oct 2026",
  },
];

function statusStyles(status: string) {
  if (status === "DELIVERED") {
    return "border-success-border bg-success-bg text-success-text";
  }
  if (status === "SHIPPED") {
    return "border-border bg-beige text-charcoal";
  }
  return "border-warning-border bg-warning-bg text-warning-text";
}

export default function AdminDashboardPage() {
  const totalStock = INITIAL_PRODUCTS.reduce(
    (total, product) =>
      total + (product.stock ?? product.inventory ?? 0),
    0
  );
  const lowStockItems = INITIAL_PRODUCTS.filter(
    (product) => (product.stock ?? product.inventory ?? 0) <= 15
  );

  return (
    <div className="flex min-h-screen flex-1 flex-col bg-beige">
      <AdminHeader
        title="Store Overview"
        subtitle="Sales analytics, order fulfilment, and stock monitoring"
        action={
          <Link
            href="/admin/products"
            className={buttonStyles({ variant: "primary", size: "sm" })}
          >
            <Package className="h-3.5 w-3.5" aria-hidden="true" />
            Manage Products
          </Link>
        }
      />

      <div className="w-full max-w-7xl space-y-6 p-4 md:p-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatsCard
            title="Monthly Revenue"
            value="₹4,82,450"
            change="18.4%"
            isPositive
            icon={IndianRupee}
            subtext="vs. previous 30 days (₹4,07,350)"
          />
          <StatsCard
            title="Orders (This Month)"
            value="142"
            change="12.5%"
            isPositive
            icon={ShoppingBag}
            subtext="3 orders pending dispatch"
          />
          <StatsCard
            title="Active Products"
            value={INITIAL_PRODUCTS.length.toString()}
            icon={Package}
            subtext={`${totalStock} total units in stock`}
          />
          <StatsCard
            title="Avg. Order Value"
            value="₹3,397"
            change="5.2%"
            isPositive
            icon={TrendingUp}
            subtext="Across all categories"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          <div className="space-y-4 rounded-lg border border-border bg-white p-5 sm:p-6 lg:col-span-8">
            <div className="flex flex-wrap items-start justify-between gap-3 border-b border-border pb-4">
              <div>
                <h2 className="font-serif text-h4 font-medium text-charcoal">
                  Recent Orders
                </h2>
                <p className="mt-0.5 text-caption text-brown-strong">
                  Latest customer orders from the online store
                </p>
              </div>
              <Badge variant="mustard">3 Pending Dispatch</Badge>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[42rem] text-left text-caption">
                <thead>
                  <tr className="border-b border-border text-micro uppercase tracking-[0.12em] text-brown-strong">
                    <th className="pb-3 pr-4 font-medium">Order ID</th>
                    <th className="pb-3 pr-4 font-medium">Customer</th>
                    <th className="pb-3 pr-4 font-medium">Product</th>
                    <th className="pb-3 pr-4 font-medium">Amount</th>
                    <th className="pb-3 pr-4 font-medium">Fulfilment</th>
                    <th className="pb-3 text-right font-medium">Time</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {recentOrders.map((order) => (
                    <tr
                      key={order.id}
                      className="transition-colors hover:bg-beige/60"
                    >
                      <td className="py-3.5 pr-4 font-medium text-dusty-rose-deep">
                        {order.id}
                      </td>
                      <td className="py-3.5 pr-4">
                        <p className="font-medium text-charcoal">
                          {order.customer}
                        </p>
                        <p className="text-brown-strong">{order.city}</p>
                      </td>
                      <td className="py-3.5 pr-4 font-medium text-charcoal">
                        {order.product}
                      </td>
                      <td className="py-3.5 pr-4 font-semibold text-charcoal">
                        ₹{order.amount.toLocaleString("en-IN")}
                      </td>
                      <td className="py-3.5 pr-4">
                        <span
                          className={cn(
                            "inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-micro font-medium uppercase tracking-[0.08em]",
                            statusStyles(order.status)
                          )}
                        >
                          {order.status === "DELIVERED" ? (
                            <CheckCircle2
                              className="h-3 w-3"
                              aria-hidden="true"
                            />
                          ) : order.status === "SHIPPED" ? (
                            <Truck className="h-3 w-3" aria-hidden="true" />
                          ) : (
                            <Clock className="h-3 w-3" aria-hidden="true" />
                          )}
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3.5 text-right text-brown-strong">
                        {order.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-4">
            <div className="space-y-4 rounded-lg border border-border bg-white p-5 sm:p-6">
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className="h-4 w-4 text-warning-text"
                  aria-hidden="true"
                />
                <h2 className="font-serif text-h4 font-medium text-charcoal">
                  Stock Monitoring
                </h2>
              </div>
              <p className="text-caption text-brown-strong">
                Products currently low in inventory. Consider re-ordering stock
                before running promotions.
              </p>

              <ul className="space-y-3 border-t border-border pt-4">
                {lowStockItems.slice(0, 3).map((item) => (
                  <li
                    key={item.id}
                    className="flex items-center justify-between gap-3 rounded-md border border-border bg-beige px-3 py-2.5 text-caption"
                  >
                    <div className="min-w-0">
                      <p className="truncate font-medium text-charcoal">
                        {item.title || item.name}
                      </p>
                      <p className="text-micro text-brown-strong">{item.sku}</p>
                    </div>
                    <span className="shrink-0 rounded-full border border-warning-border bg-warning-bg px-2 py-0.5 text-micro font-semibold text-warning-text">
                      {item.stock ?? item.inventory} left
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/admin/products"
                className={buttonStyles({
                  variant: "outline",
                  size: "sm",
                  className: "w-full",
                })}
              >
                Manage Product Inventory
                <ArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="space-y-3 rounded-lg border border-border bg-white p-5 sm:p-6">
              <h2 className="text-caption font-medium uppercase tracking-[0.12em] text-brown-strong">
                Store Infrastructure
              </h2>
              <dl className="space-y-2 text-caption">
                <div className="flex justify-between border-b border-border py-1.5">
                  <dt className="text-brown-strong">Currency</dt>
                  <dd className="font-medium text-charcoal">INR (₹)</dd>
                </div>
                <div className="flex justify-between border-b border-border py-1.5">
                  <dt className="text-brown-strong">Shipping</dt>
                  <dd className="font-medium text-success-text">
                    All India Active
                  </dd>
                </div>
                <div className="flex justify-between border-b border-border py-1.5">
                  <dt className="text-brown-strong">Image CDN</dt>
                  <dd className="font-medium text-charcoal">Cloudinary</dd>
                </div>
                <div className="flex justify-between py-1.5">
                  <dt className="text-brown-strong">Database</dt>
                  <dd className="font-medium text-charcoal">
                    PostgreSQL / Prisma
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
