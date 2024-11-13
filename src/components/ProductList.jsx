import React, { useState, useEffect } from 'react';
import useFetchProducts from '../hooks/useFetchProducts';
import ProductItem from './ProductItem';

const ProductList = () => {
    const products = useFetchProducts();
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products);

    useEffect(() => {
        if (products && products.length > 0) {
            setFilteredProducts(products);
        }
    }, [products]);

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        const filtered = products.filter((product) =>
            product.title.toLowerCase().includes(term.toLowerCase())
        );
        setFilteredProducts(filtered);
    };

    return (
        <div>
            <input
                type="text"
                value={searchTerm}
                onChange={handleSearch}
                placeholder="Search products"
                id = "search-button"
            />
            <div className="product-list">
              {/* Map through each product and display ProductItem component */}
                {filteredProducts && filteredProducts.length > 0 ? (
                    filteredProducts.map((product) => (
                        <ProductItem key={product.id} product={product} />
                    ))
                ) : (
                    <p>No products found</p>
                )}
            </div>
        </div>
    );
};

export default ProductList;








