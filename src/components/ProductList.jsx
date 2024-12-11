import React, { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';

const ProductList = () => {
  const { products, error } = useFetchProducts(); // Get products and error from the hook
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    if (products && products.length > 0) {
      setFilteredProducts(products); // Initially display all products
    }
  }, [products]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    // Filter products based on search term
    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredProducts(filtered);
  };

  if (error) return <p>Error: {error}</p>; // Display error message if fetching fails
  if (!products.length) return <p>Loading products...</p>; // Show loading message

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search products"
        id="search-button"
      />
      <div className="product-list">
        {/* Map through filtered products and display each one */}
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductItem key={product._id} product={product} /> // Use `_id` from MongoDB
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default ProductList;









