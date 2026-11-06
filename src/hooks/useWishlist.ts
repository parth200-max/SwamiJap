"use client";

import { useState, useEffect, useCallback } from "react";
import { Product } from "@/types";

const WISHLIST_STORAGE_KEY = "swami_jap_wishlist_v1";

type WishlistListener = () => void;
const listeners = new Set<WishlistListener>();

let wishlistMemory: Product[] = [];
let hasLoadedFromStorage = false;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function saveToStorage(items: Product[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save wishlist to localStorage", e);
    }
  }
}

function loadFromStorage() {
  if (typeof window !== "undefined" && !hasLoadedFromStorage) {
    try {
      const stored = localStorage.getItem(WISHLIST_STORAGE_KEY);
      if (stored) {
        wishlistMemory = JSON.parse(stored);
      }
      hasLoadedFromStorage = true;
    } catch (e) {
      console.error("Failed to parse wishlist from localStorage", e);
    }
  }
}

export function useWishlist() {
  const [, setTick] = useState(0);

  useEffect(() => {
    loadFromStorage();
    const handleUpdate = () => setTick((t) => t + 1);
    listeners.add(handleUpdate);

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const isInWishlist = useCallback((productId: string): boolean => {
    return wishlistMemory.some((item) => item.id === productId);
  }, []);

  const addItem = useCallback((product: Product) => {
    if (!wishlistMemory.some((item) => item.id === product.id)) {
      wishlistMemory = [...wishlistMemory, product];
      saveToStorage(wishlistMemory);
      notifyListeners();
    }
  }, []);

  const removeItem = useCallback((productId: string) => {
    wishlistMemory = wishlistMemory.filter((item) => item.id !== productId);
    saveToStorage(wishlistMemory);
    notifyListeners();
  }, []);

  const toggleItem = useCallback(
    (product: Product): boolean => {
      const exists = wishlistMemory.some((item) => item.id === product.id);
      if (exists) {
        removeItem(product.id);
        return false;
      } else {
        addItem(product);
        return true;
      }
    },
    [addItem, removeItem]
  );

  const clearWishlist = useCallback(() => {
    wishlistMemory = [];
    saveToStorage(wishlistMemory);
    notifyListeners();
  }, []);

  return {
    items: wishlistMemory,
    totalItems: wishlistMemory.length,
    isInWishlist,
    addItem,
    removeItem,
    toggleItem,
    clearWishlist,
  };
}

export default useWishlist;

