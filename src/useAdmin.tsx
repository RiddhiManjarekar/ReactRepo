import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "./types";
import { useGlobalContext } from "./GlobalContext";

const API_URL = "https://fakestoreapi.com/products";

export const useAdmin = () => {
  const { state } = useGlobalContext();
  const queryClient = useQueryClient();

  
  const addProductMutation = useMutation({
    mutationFn: async (newProduct: Product): Promise<Product> => {
      const response = await axios.post<Product>(API_URL, newProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product added successfully!");
    },
  });


  const editProductMutation = useMutation({
    mutationFn: async (updatedProduct: Product): Promise<Product> => {
      const response = await axios.put<Product>(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      alert("Product updated successfully!");
    },
  });

  return {
    isAdmin: state.user?.role === "admin",
    addProduct: addProductMutation.mutate,
    editProduct: editProductMutation.mutate,
  };
};
