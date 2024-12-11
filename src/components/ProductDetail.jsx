import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import '../style.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Navigate back if product not found
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) {
      setError('Invalid product ID');
      navigate('/');
      return;
    }

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/products/${id}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  // Function to Add Product to Cart
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

  if (error) return <p>Error: {error}</p>;
  if (!product) return <p>Loading product details...</p>;

  return (
    <div className="product-detail">
      <img
        src={Array.isArray(product.images) ? product.images[0] : product.images}
        alt={product.title}
      />
      <h2>{product.title}</h2>
      <p>{product.description}</p>
      <p>Price: ${product.price}</p>
      <button onClick={handleAddToCart} className="add-to-cart-button">
        Add to Cart
      </button>
    </div>
  );
};

export default ProductDetail;

