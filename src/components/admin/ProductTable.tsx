"use client";

import React, { useState } from "react";
import { Edit3, Plus, Search, Sparkles, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { INITIAL_CATEGORIES } from "@/lib/products-data";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Modal from "@/components/ui/Modal";
import ProductForm from "./ProductForm";

interface ProductTableProps {
  initialProducts: Product[];
}

function getImageUrl(image: unknown): string {
  if (typeof image === "string") return image;
  if (image && typeof (image as { url?: string }).url === "string") {
    return (image as { url: string }).url;
  }
  return "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=200&q=80";
}

export function ProductTable({ initialProducts }: ProductTableProps) {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  const filteredProducts = products.filter((product) => {
    const name = (product.title || product.name || "").toLowerCase();
    const sku = (product.sku || "").toLowerCase();
    const query = searchQuery.toLowerCase();
    const matchesSearch = name.includes(query) || sku.includes(query);
    const matchesCategory =
      categoryFilter === "all" || product.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleOpenCreate = () => {
    setEditingProduct(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
  };

  const handleDelete = (id: string) => {
    if (
      window.confirm(
        "Are you sure you want to remove this product from the store catalog?"
      )
    ) {
      setProducts((current) => current.filter((product) => product.id !== id));
    }
  };

  const handleFormSuccess = (savedProduct: Product) => {
    if (editingProduct) {
      setProducts((current) =>
        current.map((product) =>
          product.id === savedProduct.id ? savedProduct : product
        )
      );
    } else {
      setProducts((current) => [savedProduct, ...current]);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col items-stretch justify-between gap-3 sm:flex-row sm:items-end">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="w-full sm:w-72">
            <label
              htmlFor="product-search"
              className="mb-1.5 block text-caption font-medium uppercase tracking-[0.12em] text-brown-strong"
            >
              Search
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-brown-strong"
                aria-hidden="true"
              />
              <input
                id="product-search"
                type="search"
                placeholder="Search by title or SKU..."
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                className="h-11 w-full rounded-md border border-border bg-white pl-9 pr-4 text-small text-charcoal transition-colors placeholder:text-brown-strong focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
              />
            </div>
          </div>

          <div className="w-full sm:w-52">
            <label
              htmlFor="category-filter"
              className="mb-1.5 block text-caption font-medium uppercase tracking-[0.12em] text-brown-strong"
            >
              Category
            </label>
            <select
              id="category-filter"
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="h-11 w-full rounded-md border border-border bg-white px-3 text-small text-charcoal transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            >
              <option value="all">All Categories</option>
              {INITIAL_CATEGORIES.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <Button variant="primary" size="md" onClick={handleOpenCreate}>
          <Plus className="h-4 w-4" aria-hidden="true" />
          Add Product
        </Button>
      </div>

      <div className="overflow-hidden rounded-lg border border-border bg-white">
        <div className="flex items-center justify-between gap-3 border-b border-border bg-beige px-4 py-2.5 lg:hidden">
          <p className="text-micro uppercase tracking-[0.12em] text-brown-strong">
            Swipe to view all columns
          </p>
          <span
            className="text-caption text-brown-strong"
            aria-hidden="true"
          >
            →
          </span>
        </div>
        <div
          className="overflow-x-auto focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-orange"
          role="region"
          aria-label="Product catalog table. Scroll horizontally to view pricing, stock, and actions."
          tabIndex={0}
        >
          <table className="w-full min-w-[56rem] border-collapse text-left">
            <thead>
              <tr className="border-b border-border bg-beige text-micro uppercase tracking-[0.12em] text-brown-strong">
                <th className="p-4 pl-5 font-medium">Product</th>
                <th className="p-4 font-medium">SKU</th>
                <th className="p-4 font-medium">Colour</th>
                <th className="p-4 font-medium">Price (INR)</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Featured</th>
                <th className="p-4 pr-5 text-right font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border text-caption">
              {filteredProducts.map((product) => {
                const displayName =
                  product.title || product.name || "Swami Jap Bag";
                const stock = product.stock ?? product.inventory ?? 0;

                return (
                  <tr
                    key={product.id}
                    className="group transition-colors hover:bg-beige/60"
                  >
                    <td className="p-4 pl-5">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 shrink-0 overflow-hidden rounded-sm border border-border bg-beige">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img
                            src={getImageUrl(product.images?.[0])}
                            alt={displayName}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-serif text-small font-medium text-charcoal transition-colors group-hover:text-dusty-rose-deep">
                            {displayName}
                          </p>
                          <p className="line-clamp-1 max-w-xs text-micro text-brown-strong">
                            {product.tagline || product.description}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="p-4 font-mono text-brown-strong">
                      {product.sku}
                    </td>

                    <td className="p-4 text-charcoal">
                      {product.color || "Tan"}
                    </td>

                    <td className="p-4 font-medium text-charcoal">
                      ₹{Number(product.price).toLocaleString("en-IN")}
                      {product.compareAt && (
                        <span className="ml-1.5 text-micro text-brown-strong line-through">
                          ₹{Number(product.compareAt).toLocaleString("en-IN")}
                        </span>
                      )}
                    </td>

                    <td className="p-4">
                      {stock > 15 ? (
                        <Badge variant="success">{stock} in stock</Badge>
                      ) : stock > 0 ? (
                        <Badge variant="mustard">{stock} low stock</Badge>
                      ) : (
                        <Badge variant="danger">Out of stock</Badge>
                      )}
                    </td>

                    <td className="p-4">
                      {product.isFeatured ? (
                        <span className="inline-flex items-center gap-1 text-small font-medium text-dusty-rose-deep">
                          <Sparkles
                            className="h-3.5 w-3.5"
                            aria-hidden="true"
                          />
                          Featured
                        </span>
                      ) : (
                        <span className="text-small text-brown-strong">
                          Standard
                        </span>
                      )}
                    </td>

                    <td className="p-4 pr-5 text-right">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(product)}
                          className="rounded-sm p-2 text-brown-strong transition-colors hover:bg-dusty-rose-soft hover:text-dusty-rose-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          title="Edit product"
                          aria-label={`Edit ${displayName}`}
                        >
                          <Edit3 className="h-4 w-4" aria-hidden="true" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(product.id)}
                          className="rounded-sm p-2 text-brown-strong transition-colors hover:bg-danger-bg hover:text-danger-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                          title="Delete product"
                          aria-label={`Delete ${displayName}`}
                        >
                          <Trash2 className="h-4 w-4" aria-hidden="true" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredProducts.length === 0 && (
                <tr>
                  <td
                    colSpan={7}
                    className="p-12 text-center text-small text-brown-strong"
                  >
                    No products match your search or filter.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingProduct ? "Edit Product" : "Add New Bag"}
        maxWidth="2xl"
      >
        <ProductForm
          initialData={editingProduct}
          onSuccess={handleFormSuccess}
          onCancel={() => setIsModalOpen(false)}
        />
      </Modal>
    </div>
  );
}

export default ProductTable;
