"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
  ShoppingBag,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { cn } from "@/lib/cn";

export function AdminSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
  ];

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col justify-between border-r border-border bg-beige md:flex">
      <div>
        <div className="border-b border-border p-6">
          <Link
            href="/admin"
            className="flex items-center gap-2.5"
            aria-label="Swami Jap admin home"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-orange text-white">
              <span
                className="font-serif text-base font-semibold leading-none"
                aria-hidden="true"
              >
                S
              </span>
            </span>
            <span className="flex flex-col">
              <span className="font-serif text-base font-medium tracking-wide text-charcoal">
                Swami Jap
              </span>
              <span className="text-micro font-semibold uppercase tracking-[0.14em] text-dusty-rose-deep">
                Admin Panel
              </span>
            </span>
          </Link>
        </div>

        <nav className="space-y-1 p-4" aria-label="Admin navigation">
          <p className="px-3 pb-2 text-micro font-medium uppercase tracking-[0.18em] text-brown-strong">
            Management
          </p>
          {navigation.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.name}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-md px-3.5 py-2.5 text-small transition-colors",
                  isActive
                    ? "bg-brand-orange-cta font-medium text-white shadow-xs"
                    : "border border-transparent text-brown-strong hover:bg-white hover:text-charcoal"
                )}
              >
                <Icon
                  className={cn(
                    "h-4 w-4",
                    isActive ? "text-white" : "text-brown-strong"
                  )}
                  aria-hidden="true"
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="space-y-3 border-t border-border p-4">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between rounded-md border border-border bg-white px-3 py-2 text-caption font-medium text-brown-strong transition-colors hover:border-border-strong hover:text-charcoal"
        >
          <span className="flex items-center gap-2">
            <ShoppingBag
              className="h-3.5 w-3.5 text-dusty-rose-deep"
              aria-hidden="true"
            />
            View Storefront
          </span>
          <ExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>

        <div className="flex items-center justify-between rounded-md border border-border bg-white p-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-dusty-rose/25 bg-dusty-rose-soft text-caption font-serif font-semibold text-dusty-rose-deep">
              {session?.user?.name?.[0] || "A"}
            </span>
            <div className="min-w-0">
              <p className="truncate text-caption font-medium text-charcoal">
                {session?.user?.name || "Store Admin"}
              </p>
              <p className="truncate text-micro text-brown-strong">
                {session?.user?.email || "admin@swamijap.com"}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/admin/login" })}
            title="Sign Out"
            className="shrink-0 rounded-sm p-1.5 text-brown-strong transition-colors hover:bg-danger-bg hover:text-danger-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
            aria-label="Sign out"
          >
            <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default AdminSidebar;
