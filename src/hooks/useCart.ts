"use client";

import { useState, useEffect } from "react";
import { CartItem, Product } from "@/types";

const CART_STORAGE_KEY = "swami_jap_cart_v1";

// Simple pub/sub event bus so all components stay synced without complex provider trees
type CartListener = () => void;
const listeners = new Set<CartListener>();

let cartItemsMemory: CartItem[] = [];
let isCartOpenMemory = false;

function notifyListeners() {
  listeners.forEach((listener) => listener());
}

function saveToStorage(items: CartItem[]) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {
      console.error("Failed to save cart to localStorage", e);
    }
  }
}

export function useCart() {
  const [, setTick] = useState(0);

  useEffect(() => {
    const handleUpdate = () => setTick((t) => t + 1);
    listeners.add(handleUpdate);

    // Initial load from localStorage
    if (typeof window !== "undefined" && cartItemsMemory.length === 0) {
      try {
        const stored = localStorage.getItem(CART_STORAGE_KEY);
        if (stored) {
          cartItemsMemory = JSON.parse(stored);
          handleUpdate();
        }
      } catch (e) {
        console.error("Failed to parse cart from localStorage", e);
      }
    }

    return () => {
      listeners.delete(handleUpdate);
    };
  }, []);

  const addItem = (product: Product, quantity = 1, selectedColor?: string) => {
    const existingIndex = cartItemsMemory.findIndex(
      (item) =>
        item.product.id === product.id &&
        item.selectedColor === (selectedColor || product.color)
    );

    if (existingIndex > -1) {
      cartItemsMemory[existingIndex].quantity += quantity;
    } else {
      cartItemsMemory.push({
        product,
        quantity,
        selectedColor: selectedColor || product.color || undefined,
      });
    }

    saveToStorage(cartItemsMemory);
    isCartOpenMemory = true;
    notifyListeners();
  };

  const removeItem = (productId: string, selectedColor?: string) => {
    cartItemsMemory = cartItemsMemory.filter(
      (item) =>
        !(
          item.product.id === productId &&
          (selectedColor ? item.selectedColor === selectedColor : true)
        )
    );
    saveToStorage(cartItemsMemory);
    notifyListeners();
  };

  const updateQuantity = (
    productId: string,
    quantity: number,
    selectedColor?: string
  ) => {
    if (quantity <= 0) {
      removeItem(productId, selectedColor);
      return;
    }

    const item = cartItemsMemory.find(
      (i) =>
        i.product.id === productId &&
        (selectedColor ? i.selectedColor === selectedColor : true)
    );

    if (item) {
      item.quantity = quantity;
      saveToStorage(cartItemsMemory);
      notifyListeners();
    }
  };

  const clearCart = () => {
    cartItemsMemory = [];
    saveToStorage(cartItemsMemory);
    notifyListeners();
  };

  const openCart = () => {
    isCartOpenMemory = true;
    notifyListeners();
  };

  const closeCart = () => {
    isCartOpenMemory = false;
    notifyListeners();
  };

  const toggleCart = () => {
    isCartOpenMemory = !isCartOpenMemory;
    notifyListeners();
  };

  const totalItems = cartItemsMemory.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const subtotal = cartItemsMemory.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return {
    items: cartItemsMemory,
    isOpen: isCartOpenMemory,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    openCart,
    closeCart,
    toggleCart,
    totalItems,
    subtotal,
  };
}
