import { useEffect, useState } from 'react';
import API from '../utils/api';
import axios from 'axios';

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/products');
        setProducts(response.data); // Assuming the backend sends an array of products
      } catch (error) {
        console.error('Error fetching products:', error);
        setError('Failed to fetch products');
      }
    };

    fetchProducts();
  }, []);

  return { products, error };
};

export default useFetchProducts;
