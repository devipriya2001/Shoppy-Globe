import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {

  // Add Product to Cart Function
  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('authToken'); // Get token from storage

      // Send POST request to /cart
      const response = await axios.post(
        'http://localhost:5000/cart',
        { productId: product._id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      console.log('Product added to cart:', response.data);
      alert('Product added to cart!');
    } catch (error) {
      console.error('Error adding product to cart:', error.response.data);
      alert('Failed to add product to cart.');
    }
  };

  return (
    <div className="product-item">
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>

      <div className="button-container">
        {/* Link to Product Detail page */}
        <Link to={`/product/${product._id || product.id}`} className="view-details">
          View More Details
        </Link>

        <button onClick={handleAddToCart} className="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

// Correct PropTypes Validation
ProductItem.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    id: PropTypes.string,  // Fallback if _id not present
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    images: PropTypes.oneOfType([
      PropTypes.arrayOf(PropTypes.string),  // Accept array of strings
      PropTypes.string,  // Accept single string
    ]),
  }).isRequired,
};

export default ProductItem;
