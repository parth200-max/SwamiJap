export type Role = "ADMIN" | "SUPERADMIN";

export type ProductStatus = "DRAFT" | "ACTIVE" | "ARCHIVED";

export type OrderStatus =
  | "PENDING"
  | "PROCESSING"
  | "SHIPPED"
  | "DELIVERED"
  | "CANCELLED";

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  products?: Product[];
}

export interface Product {
  id: string;
  title: string;
  name?: string; // friendly alias
  slug: string;
  description: string;
  tagline?: string | null;
  price: number;
  compareAt?: number | null;
  compareAtPrice?: number | null; // friendly alias
  images: string[];
  inventory: number;
  stock?: number; // friendly alias
  sku?: string;
  isFeatured: boolean;
  status: ProductStatus;
  isArchived?: boolean;
  categoryId?: string | null;
  category?: Category | null;
  weight?: string | null;
  dimensions?: string | null;
  material?: string | null;
  color?: string | null;
  details?: string[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string | null;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  totalAmount: number;
  isPaid: boolean;
  status: OrderStatus;
  orderItems?: OrderItem[];
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  order?: Order;
  productId?: string | null;
  product?: Product | null;
  quantity: number;
  price: number;
}
