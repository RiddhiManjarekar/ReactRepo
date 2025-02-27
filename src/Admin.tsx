import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useGlobalContext } from "./GlobalContext";
import { Product } from "./types";

const API_URL = "https://fakestoreapi.com/products";

const Admin = () => {
  const { state, dispatch } = useGlobalContext();
  const [productData, setProductData] = useState<Partial<Product>>({
    title: "",
    price: 0,
    description: "",
    category: "",
    image: "",
  });


  const addProductMutation = useMutation({
    mutationFn: async (newProduct: Partial<Product>) => {
      const response = await axios.post(API_URL, newProduct);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch({ type: "ADD_PRODUCT", payload: data });
      alert("Product added successfully!");
    },
  });

  
  const updateProductMutation = useMutation({
    mutationFn: async (updatedProduct: Product) => {
      const response = await axios.put(`${API_URL}/${updatedProduct.id}`, updatedProduct);
      return response.data;
    },
    onSuccess: (data) => {
      dispatch({ type: "UPDATE_PRODUCT", payload: data });
      alert("Product updated successfully!");
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (productData.id) {
      updateProductMutation.mutate(productData as Product);
    } else {
      addProductMutation.mutate(productData);
    }
    setProductData({ title: "", price: 0, description: "", category: "", image: "" });
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={productData.title}
          onChange={(e) => setProductData({ ...productData, title: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={productData.price}
          onChange={(e) => setProductData({ ...productData, price: parseFloat(e.target.value) })}
          required
        />
        <input
          type="text"
          placeholder="Category"
          value={productData.category}
          onChange={(e) => setProductData({ ...productData, category: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={productData.image}
          onChange={(e) => setProductData({ ...productData, image: e.target.value })}
          required
        />
        <textarea
          placeholder="Description"
          value={productData.description}
          onChange={(e) => setProductData({ ...productData, description: e.target.value })}
          required
        />
        <button type="submit">{productData.id ? "Update Product" : "Add Product"}</button>
      </form>
      <h3>Existing Products</h3>
      {state.products.map((product) => (
        <div key={product.id}>
          <p>{product.title} - ${product.price}</p>
          <button onClick={() => setProductData(product)}>Edit</button>
        </div>
      ))}
    </div>
  );
};

export default Admin;
