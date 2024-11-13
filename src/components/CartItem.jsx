
import React from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart } from '../redux/cartSlice';
import PropTypes from 'prop-types'; 
import '../style.css';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleRemove = () => {
    dispatch(removeFromCart(item.id));
  };

  return (
    <div className='cart-item'>
      <h2>{item.title}</h2>
      <p>{item.price}</p>
      <button onClick={handleRemove}>Remove</button>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({         
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem;
