import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCart } from "./useCart";
import { Product } from "./types";

const API_URL = "https://fakestoreapi.com/products";

const fetchProduct = async (id?: string): Promise<Product> => {
  if (!id) throw new Error("Invalid product ID");
  const response = await axios.get<Product>(`${API_URL}/${id}`);
  return response.data;
};

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { addToCart } = useCart();

  const { data: product, isLoading, error } = useQuery<Product, Error>({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id),
    enabled: !!id, 
  });

  if (isLoading) return <p>Loading...</p>;
  if (error || !product) return <p>Error loading product.</p>;

  return (
    <div className="product-details">
      {product.image && <img src={product.image} alt={product.title} />}
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <h3>${product.price.toFixed(2)}</h3>
      <button onClick={() => addToCart(product)}>Add to Cart</button>
    </div>
  );
};

export default ProductDetails;
