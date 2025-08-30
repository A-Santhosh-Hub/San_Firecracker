export interface Firecracker {
  id: string;
  name: string;
  price: number;
  image: string;
  description?: string;
}

export interface CartItem extends Firecracker {
  quantity: number;
}

export interface Order {
  items: CartItem[];
  customerName: string;
  customerPhone: string;
  total: number;
  timestamp: Date;
}