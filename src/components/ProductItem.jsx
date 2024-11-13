import React from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="product-item">
      <h2>{product.title}</h2>
      <p>Price: ${product.price}</p>
      <div className="button-container">
        {/* Link to ProductDetail page with product ID in the URL */}
        <Link to={`/product/${product.id}`} className="view-details">
          View More Details
        </Link>
        <button onClick={handleAddToCart} className="add-to-cart">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem;

