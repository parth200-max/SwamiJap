"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, CheckCircle2 } from "lucide-react";

const SHOP_LINKS = [
  { label: "Handbags & Totes", href: "/collections/handbags" },
  { label: "Sling & Crossbody", href: "/collections/sling-bags" },
  { label: "Laptop & Work Bags", href: "/collections/laptop-bags" },
  { label: "Wallets & Accessories", href: "/collections/wallets-accessories" },
  { label: "All Collections", href: "/collections" },
];

const CUSTOMER_CARE_LINKS = [
  { label: "Our Story & Philosophy", href: "/our-story" },
  { label: "Contact Customer Care", href: "/contact" },
  { label: "Saved Wishlist", href: "/wishlist" },
  { label: "Shopping Bag", href: "/cart" },
  { label: "Customer Account", href: "/account" },
];

export function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-charcoal text-ivory">
      {/* Editorial newsletter band */}
      <div className="border-b border-white/10">
        <div className="container-page grid gap-8 py-12 lg:grid-cols-2 lg:items-end">
          <div>
            <p className="eyebrow text-ivory/60">The Swami Jap Journal</p>
            <h2 className="mt-3 font-serif text-h2 font-medium text-ivory">
              Considered bags,{" "}
              <span className="italic text-soft-pink">
                straight to your inbox.
              </span>
            </h2>
            <p className="mt-2 text-small text-ivory/70 max-w-md">
              Receive updates on small-batch production drops, design notes, and private collection previews.
            </p>
          </div>

          <div>
            {isSubscribed ? (
              <div className="flex items-center gap-2.5 rounded-md border border-white/20 bg-white/10 px-4 py-3 text-small text-ivory animate-fade-in">
                <CheckCircle2 className="h-5 w-5 text-mustard" aria-hidden="true" />
                <span>Thank you for subscribing to The Swami Jap Journal!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col gap-2.5 sm:flex-row">
                <label htmlFor="footer-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                  placeholder="Your email address"
                  className="h-11 flex-1 rounded-md border border-white/20 bg-white/10 px-3.5 text-small text-ivory transition-colors placeholder:text-ivory/60 focus:border-mustard focus:outline-none focus:ring-2 focus:ring-mustard/30"
                />
                <button
                  type="submit"
                  className="h-11 rounded-md border border-brand-orange bg-brand-orange px-5 text-small font-semibold text-white transition-colors hover:border-brand-orange-hover hover:bg-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
                >
                  Subscribe
                </button>
              </form>
            )}
            <p className="mt-2 text-micro text-ivory/50">
              We respect your inbox. Unsubscribe anytime with one click.
            </p>
          </div>
        </div>
      </div>

      {/* Main footer grid */}
      <div className="container-page grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-12">
        <div className="space-y-4 lg:col-span-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2.5"
            aria-label="Swami Jap homepage"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-sm bg-brand-orange text-white">
              <span
                className="font-serif text-base font-semibold leading-none"
                aria-hidden="true"
              >
                S
              </span>
            </span>
            <span className="font-serif text-xl font-medium tracking-wide text-ivory">
              Swami Jap
            </span>
          </Link>
          <p className="max-w-xs text-small text-ivory/70 leading-relaxed font-sans">
            Thoughtfully designed bags for everyday life. Practical details,
            versatile silhouettes, and an honest sense of contemporary Indian design.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a
              href="mailto:hello@swamijap.in"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-ivory/70 transition-colors hover:border-white/40 hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-mustard"
              aria-label="Email Swami Jap"
            >
              <Mail className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <div className="space-y-4 lg:col-span-3">
          <h3 className="eyebrow text-ivory/60">Collections</h3>
          <ul className="space-y-2.5 font-sans">
            {SHOP_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-small text-ivory/70 transition-colors hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 lg:col-span-3">
          <h3 className="eyebrow text-ivory/60">Customer Care</h3>
          <ul className="space-y-2.5 font-sans">
            {CUSTOMER_CARE_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="text-small text-ivory/70 transition-colors hover:text-ivory"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 lg:col-span-2">
          <h3 className="eyebrow text-ivory/60">Inquiries</h3>
          <p className="text-small text-ivory/70 leading-relaxed font-sans">
            Pan India Delivery
            <br />
            Mon–Sat, 10am–6pm IST
          </p>
          <p className="text-small text-ivory/70 pt-1 font-sans">
            <a
              href="mailto:hello@swamijap.in"
              className="transition-colors hover:text-ivory underline underline-offset-2"
            >
              hello@swamijap.in
            </a>
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="text-caption font-semibold text-mustard hover:underline"
            >
              Frequently Asked Questions →
            </Link>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col items-start justify-between gap-3 py-6 text-caption text-ivory/60 sm:flex-row sm:items-center">
          <p>© 2026 Swami Jap. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Contemporary Indian Design</span>
            <span>·</span>
            <Link
              href="/admin/login"
              className="transition-colors hover:text-ivory text-micro uppercase tracking-wider text-ivory/40"
            >
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
