import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductTable from './ProductTable';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/v1/buysell');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

// Handle bulk execution
const handleBulkExecution = async () => {
  try {
    // Call the API for bulk execution
    const response = await axios.post('http://localhost:8080/api/v1/buysell/execute');
    console.log('Bulk execution response:', response.data);
    
    // If the API call is successful, fetch the updated product list
    const updatedProductsResponse = await axios.get('http://localhost:8080/api/v1/buysell');
    setProducts(updatedProductsResponse.data);
  } catch (error) {
    console.error('Error executing bulk:', error);
  }
};

  // Handle buy/sell stocks
  const handleBuySellStocks = async () => {
    try {
      // Call the API for bulk execution
      const response = await axios.put('http://localhost:8080/api/v1/buysell/doBuySellStocks');
      console.log('Bulk execution response:', response.data);
      
      // If the API call is successful, fetch the updated product list
      const updatedProductsResponse = await axios.get('http://localhost:8080/api/v1/buysell');
      setProducts(updatedProductsResponse.data);
    } catch (error) {
      console.error('Error executing bulk:', error);
    }
  };

  // Handle delete operation
  const handleDeleteOperation = async () => {
    try {
      // Call the API for delete operation
      const response = await axios.delete('http://localhost:8080/api/v1/buysell/deleteAll');
      console.log('delete operation response:', response.data);
      
      // If the API call is successful, fetch the updated product list
      const updatedProductsResponse = await axios.get('http://localhost:8080/api/v1/buysell');
      setProducts(updatedProductsResponse.data);
    } catch (error) {
      console.error('Error executing delete operation:', error);
    }
  };
  

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product List</h2>
      <div className="flex justify-between items-center mb-4">
        <div>
          <button onClick={handleBulkExecution} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-4">
            Bulk Execution
          </button>
          <button onClick={handleBuySellStocks} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-4">
            Buy/Sell Stocks
          </button>

          <button onClick={handleDeleteOperation} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mr-4">
            Delete All
          </button>
        </div>
      </div>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ProductTable products={products} />
      )}
    </div>
  );
};

export default Products;
