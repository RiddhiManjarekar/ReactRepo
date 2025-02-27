export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number; 
}

export interface User {
  id: number;
  name: string;
  role: "user" | "admin";
}

export interface GlobalState {
  products: Product[];
  cart: Product[];
  user: User | null;
  authStatus: { isAuthenticated: boolean; userRole: string | null }; 
}
