"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Package, ShieldCheck, UserCheck, Lock } from "lucide-react";
import Breadcrumb from "@/components/ui/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

export default function CustomerAccountPage() {
  const [activeTab, setActiveTab] = useState<"signin" | "tracking">("signin");
  const [orderId, setOrderId] = useState("");
  const [orderEmail, setOrderEmail] = useState("");
  const [trackingResult, setTrackingResult] = useState<string | null>(null);

  const handleTrackOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId && orderEmail) {
      setTrackingResult(
        `Order ${orderId.toUpperCase()} is confirmed and currently in warehouse fulfillment. Dispatch tracking updates are sent to ${orderEmail}.`
      );
    }
  };

  return (
    <div className="section-pad pt-28 sm:pt-32 bg-ivory min-h-[70vh]">
      <div className="container-page max-w-4xl">
        {/* Breadcrumb Navigation */}
        <Breadcrumb items={[{ label: "Customer Account" }]} />

        {/* Header */}
        <div className="mt-4 pb-8 border-b border-border text-center">
          <Badge variant="mustard">Customer Portal</Badge>
          <h1 className="mt-4 font-serif text-h1 font-medium text-charcoal leading-tight">
            Account &amp; <span className="italic text-dusty-rose-deep">Order Tracking</span>
          </h1>
          <p className="mt-2 text-lead text-charcoal-soft font-sans max-w-xl mx-auto">
            Manage your personal profile, track recent deliveries, and view saved bags.
          </p>

          {/* Navigation Tabs */}
          <div className="mt-8 flex justify-center gap-3">
            <button
              type="button"
              onClick={() => setActiveTab("signin")}
              className={`rounded-full px-5 py-2.5 text-caption font-semibold transition-colors shadow-xs ${
                activeTab === "signin"
                  ? "border border-brand-orange bg-brand-orange text-white"
                  : "border border-border bg-white text-charcoal-soft hover:border-charcoal hover:bg-beige"
              }`}
            >
              Customer Sign In
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("tracking")}
              className={`rounded-full px-5 py-2.5 text-caption font-semibold transition-colors shadow-xs ${
                activeTab === "tracking"
                  ? "border border-brand-orange bg-brand-orange text-white"
                  : "border border-border bg-white text-charcoal-soft hover:border-charcoal hover:bg-beige"
              }`}
            >
              Track Guest Order
            </button>
          </div>
        </div>

        {/* Tab 1: Customer Sign In & Registration Presentation */}
        {activeTab === "signin" && (
          <div className="mt-10 mx-auto max-w-md rounded-xl border border-border bg-white p-6 sm:p-8 shadow-xs">
            <div className="text-center pb-6 border-b border-border/70">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-soft-pink/30 text-dusty-rose-deep">
                <UserCheck className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-serif text-h3 font-medium text-charcoal">
                Sign In to Your Account
              </h2>
              <p className="mt-1 text-caption text-charcoal-soft font-sans">
                Access your order history and saved delivery addresses.
              </p>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Customer authentication is currently scheduled for Phase 6 backend integration. You can shop freely as a guest or track your orders below.");
              }}
              className="mt-6 space-y-4"
            >
              <div>
                <label htmlFor="customer-email" className="block text-caption font-medium text-charcoal">
                  Email Address
                </label>
                <Input
                  id="customer-email"
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="mt-1.5"
                />
              </div>

              <div>
                <label htmlFor="customer-pass" className="block text-caption font-medium text-charcoal">
                  Password
                </label>
                <Input
                  id="customer-pass"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="mt-1.5"
                />
              </div>

              <div className="flex items-center justify-between text-micro text-brown-strong pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="rounded-xs border-border" />
                  <span>Remember me</span>
                </label>
                <button type="button" className="text-brand-orange hover:underline">
                  Forgot password?
                </button>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                <Lock className="h-4 w-4" aria-hidden="true" />
                Sign In
              </Button>
            </form>

            <div className="mt-6 pt-4 border-t border-border/70 text-center text-caption text-charcoal-soft">
              <span>New to Swami Jap? </span>
              <button
                type="button"
                onClick={() => alert("Registration will be active with Phase 6 Customer Accounts.")}
                className="font-semibold text-brand-orange hover:underline"
              >
                Create an account
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Guest Order Tracking */}
        {activeTab === "tracking" && (
          <div className="mt-10 mx-auto max-w-lg rounded-xl border border-border bg-white p-6 sm:p-8 shadow-xs">
            <div className="text-center pb-6 border-b border-border/70">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-mustard/20 text-mustard-deep">
                <Package className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-3 font-serif text-h3 font-medium text-charcoal">
                Track Order Delivery
              </h2>
              <p className="mt-1 text-caption text-charcoal-soft font-sans">
                Check dispatch status without needing to sign in.
              </p>
            </div>

            <form onSubmit={handleTrackOrder} className="mt-6 space-y-4">
              <div>
                <label htmlFor="track-order-id" className="block text-caption font-medium text-charcoal">
                  Order Number *
                </label>
                <Input
                  id="track-order-id"
                  type="text"
                  required
                  placeholder="e.g. SJ-2026-1042"
                  value={orderId}
                  onChange={(e) => setOrderId(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <div>
                <label htmlFor="track-order-email" className="block text-caption font-medium text-charcoal">
                  Billing Email Address *
                </label>
                <Input
                  id="track-order-email"
                  type="email"
                  required
                  placeholder="Email used during checkout"
                  value={orderEmail}
                  onChange={(e) => setOrderEmail(e.target.value)}
                  className="mt-1.5"
                />
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full mt-2">
                Track Delivery
              </Button>
            </form>

            {trackingResult && (
              <div className="mt-6 rounded-lg border border-success-border bg-success-bg p-4 text-small text-success-text font-sans animate-fade-in">
                <p className="font-semibold">Status Update:</p>
                <p className="mt-1 leading-relaxed">{trackingResult}</p>
              </div>
            )}
          </div>
        )}

        {/* Administrative Separation Notice */}
        <div className="mt-12 rounded-lg border border-border/80 bg-beige/50 p-4 text-center text-caption text-charcoal-soft font-sans">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-4 w-4 text-brown-strong" aria-hidden="true" />
            <span>Store managers and inventory admins: </span>
            <Link
              href="/admin/login"
              className="font-semibold text-charcoal hover:text-brand-orange underline underline-offset-2"
            >
              Access Admin Management Console →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

