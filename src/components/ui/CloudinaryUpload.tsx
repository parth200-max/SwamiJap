"use client";

import React, { useState } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { UploadCloud, X } from "lucide-react";
import Button from "./Button";

interface CloudinaryUploadProps {
  value?: string[];
  onChange: (urls: string[]) => void;
  onRemove?: (url: string) => void;
  maxFiles?: number;
}

export function CloudinaryUpload({
  value = [],
  onChange,
  onRemove,
  maxFiles = 5,
}: CloudinaryUploadProps) {
  const [manualUrl, setManualUrl] = useState("");
  const uploadPreset =
    process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "swamijap_preset";

  const handleUploadSuccess = (result: unknown) => {
    const info = (result as { info?: { secure_url?: string } })?.info;
    if (info?.secure_url) {
      onChange([...value, info.secure_url]);
    }
  };

  const handleAddManualUrl = () => {
    if (manualUrl.trim()) {
      onChange([...value, manualUrl.trim()]);
      setManualUrl("");
    }
  };

  const handleRemove = (urlToRemove: string) => {
    if (onRemove) {
      onRemove(urlToRemove);
    } else {
      onChange(value.filter((url) => url !== urlToRemove));
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-4">
        {value.map((url, index) => (
          <div
            key={`${url}-${index}`}
            className="group relative h-28 w-28 overflow-hidden rounded-md border border-border bg-beige"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={url}
              alt="Uploaded bag preview"
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <button
              type="button"
              onClick={() => handleRemove(url)}
              className="absolute right-1.5 top-1.5 rounded-full bg-charcoal/70 p-1 text-white opacity-0 transition-opacity hover:bg-charcoal group-hover:opacity-100 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              aria-label="Remove image"
            >
              <X className="h-3.5 w-3.5" aria-hidden="true" />
            </button>
          </div>
        ))}

        {value.length < maxFiles && (
          <CldUploadWidget
            uploadPreset={uploadPreset}
            onSuccess={handleUploadSuccess}
            options={{
              maxFiles: maxFiles - value.length,
              resourceType: "image",
              sources: ["local", "url", "camera"],
            }}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={() => open?.()}
                className="flex h-28 w-28 flex-col items-center justify-center rounded-md border border-dashed border-border-strong bg-beige p-2 text-center text-brown-strong transition-colors hover:border-brand-orange hover:bg-white hover:text-brand-orange-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-orange"
              >
                <UploadCloud
                  className="mb-1 h-6 w-6 text-brand-orange"
                  aria-hidden="true"
                />
                <span className="text-micro font-medium uppercase tracking-[0.12em]">
                  Upload Image
                </span>
              </button>
            )}
          </CldUploadWidget>
        )}
      </div>

      <div className="flex flex-col gap-2 pt-1 sm:flex-row">
        <label htmlFor="manual-image-url" className="sr-only">
          Direct image URL
        </label>
        <input
          id="manual-image-url"
          type="url"
          placeholder="Or paste direct image URL (https://...)"
          value={manualUrl}
          onChange={(event) => setManualUrl(event.target.value)}
          className="h-10 flex-1 rounded-md border border-border bg-white px-3 text-caption text-charcoal transition-colors placeholder:text-brown-strong focus:border-brand-orange focus:outline-none focus:ring-2 focus:ring-brand-orange/20"
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          onClick={handleAddManualUrl}
        >
          Add URL
        </Button>
      </div>
    </div>
  );
}

export default CloudinaryUpload;
