import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateCartQuantity, removeFromCart, setCart } from '../redux/cartSlice';
import axios from 'axios';
import '../style.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('http://localhost:5000/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        // Directly set the cart items in Redux
        dispatch(setCart(response.data || [])); // Ensure you're dispatching the correct data format
      } catch (error) {
        console.error('Error fetching cart:', error.response?.data || error);
      }
    };
    fetchCart();
  }, [dispatch]);
  

  // Update Product Quantity
  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.put(
        'http://localhost:5000/cart',
        { productId, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      dispatch(updateCartQuantity({ productId, quantity })); // Update Redux state
    } catch (error) {
      console.error('Error updating cart:', error.response?.data || error);
    }
  };

  // Remove Product from Cart
  const handleRemoveProduct = async (productId) => {
    try {
      const token = localStorage.getItem('authToken');
      await axios.delete('http://localhost:5000/cart', {
        data: { productId },
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(removeFromCart(productId)); // Update Redux state
    } catch (error) {
      console.error('Error removing product from cart:', error.response?.data || error);
    }
  };

  // Render Cart
  return (
    <div className="cart">
      <h2>Your Cart</h2>
      <div className="cart-items">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.productId} className="cart-item">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>

              <div className="cart-actions">
                <button
                  onClick={() =>
                    handleUpdateQuantity(item.productId, item.quantity + 1)
                  }
                >
                  Increase
                </button>
                <button
                  onClick={() =>
                    handleUpdateQuantity(
                      item.productId,
                      item.quantity > 1 ? item.quantity - 1 : 1
                    )
                  }
                >
                  Decrease
                </button>
                <button onClick={() => handleRemoveProduct(item.productId)}>
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>
    </div>
  );
};

export default Cart;
