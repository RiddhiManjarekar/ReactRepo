import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Product } from "./types";

const API_URL = "https://fakestoreapi.com/products";


const fetchProducts = async (): Promise<Product[]> => {
  const response = await axios.get<Product[]>(API_URL);
  return response.data;
};


export const useProducts = (category?: string) => {
  return useQuery<Product[]>({
    queryKey: ["products", category],
    queryFn: async () => {
      const products = await fetchProducts();
      return category
        ? products.filter((product) => product.category === category)
        : products;
    },
  });
};
