import { GlobalState } from "./types";

type Action = {
  type: string;
  payload?: any;
};

export const initialState: GlobalState = {
  cart: [],
  authStatus: { isAuthenticated: false, userRole: null },
  products: [],
  user: null,
};

export const globalReducer = (state: GlobalState, action: Action): GlobalState => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, authStatus: { isAuthenticated: true, userRole: action.payload?.userRole }, user: action.payload };
    case "LOGOUT":
      return { ...state, authStatus: { isAuthenticated: false, userRole: null }, user: null, cart: [] };
    case "SET_PRODUCTS":
      return { ...state, products: action.payload };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: state.cart.some((item) => item.id === action.payload?.id)
          ? state.cart.map((item) =>
              item.id === action.payload?.id ? { ...item, quantity: (item.quantity || 0) + 1 } : item 
            )
          : [...state.cart, { ...action.payload, quantity: 1 }],
      };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item.id !== action.payload) };
    case "UPDATE_PRODUCT":
      return {
        ...state,
        products: state.products.map((product) =>
          product.id === action.payload?.id ? { ...product, ...action.payload } : product
        ),
      };
    case "ADD_PRODUCT":
      return { ...state, products: [...state.products, action.payload] };
    default:
      return state;
  }
};
