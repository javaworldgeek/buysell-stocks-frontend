import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://192.168.1.121:8080/api/v1/buysell'); // Replace '/api/products' with your actual endpoint
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default Products;
