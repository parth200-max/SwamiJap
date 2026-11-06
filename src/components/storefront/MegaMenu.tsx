"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

export interface MegaMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

interface MegaMenuColumn {
  title: string;
  href?: string;
  isHeadingLink?: boolean;
  items: { label: string; href: string }[];
}

const MEGA_MENU_COLUMNS: MegaMenuColumn[] = [
  {
    title: "ALL COLLECTIONS",
    href: "/collections",
    isHeadingLink: true,
    items: [
      { label: "All Bags & Silhouettes", href: "/collections" },
      { label: "New Arrivals", href: "/#new-arrivals" },
      { label: "Collections Overview", href: "/collections" },
      { label: "Our Story & Ethos", href: "/our-story" },
      { label: "Custom Commission", href: "/contact" },
    ],
  },
  {
    title: "HANDPURSE",
    href: "/collections/handbags",
    items: [
      { label: "Daisy Purse-1", href: "/collections/handbags" },
      { label: "Everyday Structured Tote", href: "/collections/handbags" },
      { label: "Compact Purse", href: "/collections/handbags" },
      { label: "View All Handpurses", href: "/collections/handbags" },
    ],
  },
  {
    title: "ORGANISER",
    href: "/collections/wallets-accessories",
    items: [
      { label: "Pothi Cover", href: "/collections/wallets-accessories" },
      { label: "Single Saree Covers", href: "/collections/wallets-accessories" },
      { label: "Shoe Cover", href: "/collections/wallets-accessories" },
      { label: "Work Folio Organiser", href: "/collections/wallets-accessories" },
      { label: "View All Organisers", href: "/collections/wallets-accessories" },
    ],
  },
  {
    title: "POUCHES",
    href: "/collections/wallets-accessories",
    items: [
      { label: "Long Boat Pouch", href: "/collections/wallets-accessories" },
      { label: "Twin Pouch", href: "/collections/wallets-accessories" },
      { label: "PC-S Pouch", href: "/collections/wallets-accessories" },
      { label: "Nested Pouch Set", href: "/collections/wallets-accessories" },
      { label: "Jasmine Pouch", href: "/collections/wallets-accessories" },
      { label: "VP Set", href: "/collections/wallets-accessories" },
      { label: "PC-M Pouch", href: "/collections/wallets-accessories" },
      { label: "Travel Pouch-3 zips", href: "/collections/wallets-accessories" },
    ],
  },
  {
    title: "SHOULDER BAGS",
    href: "/collections/handbags",
    items: [
      { label: "Pr Sh Bag", href: "/collections/handbags" },
      { label: "SB Sh Bag", href: "/collections/handbags" },
      { label: "Canary Bag & Purse", href: "/collections/handbags" },
      { label: "Ar Sh Bag", href: "/collections/handbags" },
      { label: "Ri Sh bag", href: "/collections/handbags" },
      { label: "Magpie Bag & Pouch", href: "/collections/handbags" },
      { label: "Weekend Duffel", href: "/collections/handbags" },
    ],
  },
  {
    title: "SLING BAGS",
    href: "/collections/sling-bags",
    items: [
      { label: "Ibis Sling", href: "/collections/sling-bags" },
      { label: "Warli Sling", href: "/collections/sling-bags" },
      { label: "Triple Zip Sling", href: "/collections/sling-bags" },
      { label: "On-the-Move Sling", href: "/collections/sling-bags" },
      { label: "Mobile Sling with Flap", href: "/collections/sling-bags" },
      { label: "Mini Sacks", href: "/collections/sling-bags" },
      { label: "SK Button sling", href: "/collections/sling-bags" },
      { label: "Casual Sling", href: "/collections/sling-bags" },
      { label: "Honeybell sling", href: "/collections/sling-bags" },
      { label: "Bluebell sling", href: "/collections/sling-bags" },
      { label: "RKP Sling", href: "/collections/sling-bags" },
    ],
  },
];

export function MegaMenu({ isOpen, onClose }: MegaMenuProps) {
  const menuRef = useRef<HTMLDivElement>(null);

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Close on click outside
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        const toggleBtn = document.getElementById("collections-mega-menu-trigger");
        if (toggleBtn && toggleBtn.contains(e.target as Node)) {
          return;
        }
        onClose();
      }
    };

    const timer = setTimeout(() => {
      document.addEventListener("mousedown", handleClickOutside);
    }, 10);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      ref={menuRef}
      id="collections-mega-menu"
      role="region"
      aria-label="Collections Mega Menu"
      className="absolute inset-x-0 top-full z-50 border-b border-x border-[#DED8CE] bg-[#F5F1E9] shadow-xl rounded-b-2xl overflow-hidden"
    >
      {/* Subtle top highlight line */}
      <div
        className="absolute top-0 inset-x-0 h-px bg-white/70 pointer-events-none"
        aria-hidden="true"
      />

      <div className="container-page py-6 sm:py-8">
        {/* 6-Column Grid with Vertical Column Separators */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 divide-y divide-[#DED8CE] sm:divide-y-0 lg:divide-x lg:divide-[#DED8CE]">
          {MEGA_MENU_COLUMNS.map((column, index) => {
            const isAllCol = column.title === "ALL COLLECTIONS";

            return (
              <div
                key={column.title}
                className={`flex flex-col py-3 sm:py-0 ${
                  index === 0 ? "lg:pr-5" : index === 5 ? "lg:pl-5" : "lg:px-5"
                }`}
              >
                {/* Column Heading with border-b separator */}
                <div className="pb-2.5 border-b border-[#DED8CE] mb-3">
                  {column.href ? (
                    <Link
                      href={column.href}
                      onClick={onClose}
                      className={`text-[12px] font-bold uppercase tracking-wider transition-colors ${
                        isAllCol
                          ? "text-[#806B59] hover:text-brand-orange"
                          : "text-[#292929] hover:text-brand-orange"
                      }`}
                    >
                      {column.title}
                    </Link>
                  ) : (
                    <h3 className="text-[12px] font-bold uppercase tracking-wider text-[#292929]">
                      {column.title}
                    </h3>
                  )}
                </div>

                {/* Plain Stacked Links */}
                <ul className="space-y-2">
                  {column.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={onClose}
                        className="block text-[13px] font-sans text-[#4A453F] hover:text-brand-orange transition-colors leading-snug"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>

      {/* Full-width Bottom Footer Strip */}
      <div className="border-t border-[#DED8CE] py-3 text-center bg-[#F5F1E9]">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-[#806B59]">
          HANDCRAFTED WITH LOVE IN INDIA ✦
        </p>
      </div>
    </div>
  );
}

export default MegaMenu;
