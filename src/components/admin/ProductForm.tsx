"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Plus, Trash2 } from "lucide-react";
import { Product } from "@/types";
import { INITIAL_CATEGORIES } from "@/lib/products-data";
import Input from "@/components/ui/Input";
import Textarea from "@/components/ui/Textarea";
import Button from "@/components/ui/Button";
import CloudinaryUpload from "@/components/ui/CloudinaryUpload";

const productSchema = z.object({
  name: z.string().min(2, "Product name must be at least 2 characters"),
  slug: z.string().min(2, "Slug must be at least 2 characters"),
  tagline: z.string().optional(),
  description: z.string().min(10, "Please provide a detailed description"),
  price: z.number().positive("Price must be a positive number"),
  compareAtPrice: z.number().nullable().optional(),
  stock: z.number().int().min(0, "Stock cannot be negative"),
  sku: z.string().min(3, "SKU must be at least 3 characters"),
  categoryId: z.string().min(1, "Please select a category"),
  color: z.string().min(2, "Please specify a colour"),
  material: z.string().min(2, "Please specify a material"),
  weight: z.string().optional(),
  dimensions: z.string().optional(),
  isFeatured: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product | null;
  onSuccess: (product: Product) => void;
  onCancel: () => void;
}

function normalizeImage(image: unknown): string {
  if (typeof image === "string") return image;
  if (image && typeof (image as { url?: string }).url === "string") {
    return (image as { url: string }).url;
  }
  return "";
}

export function ProductForm({
  initialData,
  onSuccess,
  onCancel,
}: ProductFormProps) {
  const [images, setImages] = useState<string[]>(() =>
    (initialData?.images ?? []).map(normalizeImage).filter(Boolean)
  );
  const [details, setDetails] = useState<string[]>(
    initialData?.details ?? []
  );
  const [newDetail, setNewDetail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: initialData?.name || initialData?.title || "",
      slug: initialData?.slug || "",
      tagline: initialData?.tagline || "",
      description: initialData?.description || "",
      price: initialData?.price || 3499,
      compareAtPrice:
        initialData?.compareAtPrice ?? initialData?.compareAt ?? null,
      stock: initialData?.stock ?? initialData?.inventory ?? 25,
      sku: initialData?.sku || "SJ-BAG-01",
      categoryId: initialData?.categoryId || INITIAL_CATEGORIES[0].id,
      color: initialData?.color || "Warm Tan",
      material: initialData?.material || "Premium Vegan Leather",
      weight: initialData?.weight || "0.65 kg",
      dimensions: initialData?.dimensions || "34cm × 26cm × 11cm",
      isFeatured: initialData?.isFeatured ?? false,
    },
  });

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.target.value;
    setValue("name", name);

    if (!initialData) {
      setValue(
        "slug",
        name
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  };

  const handleAddDetail = () => {
    if (newDetail.trim()) {
      setDetails((current) => [...current, newDetail.trim()]);
      setNewDetail("");
    }
  };

  const handleRemoveDetail = (index: number) => {
    setDetails((current) =>
      current.filter((_, detailIndex) => detailIndex !== index)
    );
  };

  const onSubmit = async (data: ProductFormData) => {
    setIsSubmitting(true);

    try {
      const payload: Product = {
        id: initialData?.id || `prod-${data.slug}`,
        title: data.name,
        name: data.name,
        slug: data.slug,
        tagline: data.tagline || null,
        description: data.description,
        price: data.price,
        compareAt: data.compareAtPrice ?? null,
        compareAtPrice: data.compareAtPrice ?? null,
        inventory: data.stock,
        stock: data.stock,
        sku: data.sku,
        color: data.color,
        material: data.material,
        weight: data.weight || null,
        dimensions: data.dimensions || null,
        images,
        details,
        isFeatured: data.isFeatured,
        status: initialData?.status ?? "ACTIVE",
        isArchived: initialData?.isArchived ?? false,
        categoryId: data.categoryId,
        createdAt: initialData?.createdAt || new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      await new Promise((resolve) => window.setTimeout(resolve, 400));
      onSuccess(payload);
    } catch (error) {
      console.error("Failed to save product", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <p className="text-caption font-medium uppercase tracking-[0.12em] text-brown-strong">
          Product Imagery (Cloudinary or Direct URL)
        </p>
        <CloudinaryUpload
          value={images}
          onChange={(urls) => setImages(urls)}
          maxFiles={5}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          label="Product Title"
          placeholder="e.g. Everyday Structured Tote"
          required
          error={errors.name?.message}
          {...register("name")}
          onChange={handleNameChange}
        />
        <Input
          label="URL Slug"
          placeholder="everyday-structured-tote"
          required
          error={errors.slug?.message}
          {...register("slug")}
        />
      </div>

      <Input
        label="Short Tagline"
        placeholder="e.g. Structured silhouette with thoughtful pockets for office & weekend"
        error={errors.tagline?.message}
        {...register("tagline")}
      />

      <Textarea
        label="Detailed Description"
        required
        rows={3}
        placeholder="Describe the bag's everyday utility, compartments, feel, and design details..."
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="Price (₹ INR)"
          type="number"
          step="1"
          placeholder="3499"
          required
          error={errors.price?.message}
          {...register("price", { valueAsNumber: true })}
        />
        <Input
          label="Compare-At Price (₹ INR)"
          type="number"
          step="1"
          placeholder="4299"
          error={errors.compareAtPrice?.message}
          {...register("compareAtPrice", {
            setValueAs: (value) =>
              value === "" || value === undefined ? null : Number(value),
          })}
        />
        <Input
          label="Available Stock"
          type="number"
          placeholder="25"
          required
          error={errors.stock?.message}
          {...register("stock", { valueAsNumber: true })}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="SKU Code"
          placeholder="SJ-BAG-01"
          required
          error={errors.sku?.message}
          {...register("sku")}
        />

        <div className="w-full space-y-1.5">
          <label
            htmlFor="product-category"
            className="block text-caption font-medium uppercase tracking-[0.12em] text-brown-strong"
          >
            Category
            <span className="ml-1 text-dusty-rose-deep" aria-hidden="true">
              *
            </span>
          </label>
          <select
            id="product-category"
            className="h-11 w-full rounded-md border border-border bg-white px-3.5 text-small text-charcoal transition-colors focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            aria-invalid={errors.categoryId ? true : undefined}
            {...register("categoryId")}
          >
            {INITIAL_CATEGORIES.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {errors.categoryId?.message && (
            <p className="text-caption text-danger-text">
              {errors.categoryId.message}
            </p>
          )}
        </div>

        <Input
          label="Colour / Shade"
          placeholder="Warm Tan"
          required
          error={errors.color?.message}
          {...register("color")}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <Input
          label="Primary Material"
          placeholder="Premium Vegan Leather"
          required
          error={errors.material?.message}
          {...register("material")}
        />
        <Input
          label="Weight"
          placeholder="0.65 kg"
          error={errors.weight?.message}
          {...register("weight")}
        />
        <Input
          label="Dimensions"
          placeholder="34cm × 26cm × 11cm"
          error={errors.dimensions?.message}
          {...register("dimensions")}
        />
      </div>

      <div className="space-y-2">
        <p className="text-caption font-medium uppercase tracking-[0.12em] text-brown-strong">
          Key Bag Features &amp; Specifications
        </p>
        <div className="space-y-2">
          {details.map((detail, index) => (
            <div
              key={`${detail}-${index}`}
              className="flex items-center justify-between gap-3 rounded-md border border-border bg-beige px-3 py-2.5 text-caption text-charcoal"
            >
              <span>• {detail}</span>
              <button
                type="button"
                onClick={() => handleRemoveDetail(index)}
                className="rounded-sm p-1 text-brown-strong transition-colors hover:bg-danger-bg hover:text-danger-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
                aria-label={`Remove detail: ${detail}`}
              >
                <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </div>
          ))}

          <div className="flex flex-col gap-2 sm:flex-row">
            <label htmlFor="new-detail" className="sr-only">
              Add a product detail
            </label>
            <input
              id="new-detail"
              type="text"
              placeholder="e.g. Dedicated padded tablet sleeve..."
              value={newDetail}
              onChange={(event) => setNewDetail(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddDetail();
                }
              }}
              className="h-10 flex-1 rounded-md border border-border bg-white px-3 text-small text-charcoal transition-colors placeholder:text-brown-strong focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={handleAddDetail}
            >
              <Plus className="h-3.5 w-3.5" aria-hidden="true" />
              Add
            </Button>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <input
          type="checkbox"
          id="isFeatured"
          className="h-4 w-4 cursor-pointer rounded-sm border-border accent-brand-orange focus:ring-brand-orange/20"
          {...register("isFeatured")}
        />
        <label
          htmlFor="isFeatured"
          className="cursor-pointer text-caption font-medium uppercase tracking-[0.1em] text-charcoal"
        >
          Feature this bag on the storefront homepage
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 border-t border-border pt-4">
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" variant="primary" isLoading={isSubmitting}>
          {initialData ? "Save Changes" : "Create Product"}
        </Button>
      </div>
    </form>
  );
}

export default ProductForm;
