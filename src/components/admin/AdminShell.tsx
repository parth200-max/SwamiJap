"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ExternalLink,
  LayoutDashboard,
  LogOut,
  Package,
} from "lucide-react";
import { signOut } from "next-auth/react";
import AdminSidebar from "./AdminSidebar";
import { cn } from "@/lib/cn";

const MOBILE_NAV = [
  { label: "Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Store", href: "/", icon: ExternalLink },
];

export function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLoginPage = pathname === "/admin/login";

  if (isLoginPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-screen bg-beige text-charcoal">
      <AdminSidebar />

      <main className="flex min-w-0 flex-1 flex-col pb-20 md:pb-0">
        {children}
      </main>

      <nav
        className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-white md:hidden"
        aria-label="Admin mobile navigation"
      >
        {MOBILE_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            item.href === "/admin"
              ? pathname === "/admin"
              : item.href === "/"
                ? false
                : pathname.startsWith(item.href);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[0.625rem] font-medium uppercase leading-tight tracking-[0.06em] transition-colors",
                isActive
                  ? "text-brand-orange-hover"
                  : "text-brown-strong hover:text-charcoal"
              )}
            >
              <Icon className="h-4 w-4" aria-hidden="true" />
              <span className="truncate">{item.label}</span>
            </Link>
          );
        })}

        <button
          type="button"
          onClick={() => signOut({ callbackUrl: "/admin/login" })}
          className="flex min-w-0 flex-1 flex-col items-center gap-1 px-1 py-2.5 text-[0.625rem] font-medium uppercase leading-tight tracking-[0.06em] text-brown-strong transition-colors hover:text-danger-text"
        >
          <LogOut className="h-4 w-4" aria-hidden="true" />
          <span className="truncate">Sign out</span>
        </button>
      </nav>
    </div>
  );
}

export default AdminShell;
