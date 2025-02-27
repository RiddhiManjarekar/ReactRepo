import { useGlobalContext } from "./GlobalContext";
import { Product } from "./types";
import { useMutation } from "@tanstack/react-query";

export const useCart = () => {
  const { state, dispatch } = useGlobalContext(); 

  const addToCartMutation = useMutation({
    mutationFn: (product: Product) =>
      new Promise((resolve) => setTimeout(() => resolve(product), 500)),
    onSuccess: (product) => {
      dispatch({ type: "ADD_TO_CART", payload: product });
      alert("Item added to cart");
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: (productId: number) =>
      new Promise((resolve) => setTimeout(() => resolve(productId), 500)),
    onSuccess: (productId) => {
      dispatch({ type: "REMOVE_FROM_CART", payload: productId });
      alert("Item removed from cart");
    },
  });

  return {
    cart: state.cart,
    addToCart: addToCartMutation.mutate,
    removeFromCart: removeFromCartMutation.mutate,
  };
};
