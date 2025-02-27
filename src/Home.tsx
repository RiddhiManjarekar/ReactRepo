import { useState } from "react";
import { useProducts } from "./useProducts";
import ProductCard from "./ProductCard";

const Home = () => {
  const { data: products, isLoading, error } = useProducts();
  const [selectedCategory, setSelectedCategory] = useState("");

  const categories = [...new Set(products?.map((p) => p.category))];

  const filteredProducts = selectedCategory
    ? products?.filter((p) => p.category === selectedCategory)
    : products;

  if (isLoading) return <p>Loading products...</p>;
  if (error) return <p>Error fetching products</p>;

  return (
    <div>
      <h1>Products</h1>
      <div>
        <label>Filter by category:</label>
        <select onChange={(e) => setSelectedCategory(e.target.value)}>
          <option value="">All</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>
      </div>
      <div>
        {filteredProducts?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Home;
