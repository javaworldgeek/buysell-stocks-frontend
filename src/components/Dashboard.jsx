import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    transType: '',
    stockSts: ''
  });

  const [errors, setErrors] = useState({});
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear errors when user starts typing
    setErrors({ ...errors, [name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let errors = {};

    // Validate mandatory fields
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    if (!formData.quantity.trim()) {
      errors.quantity = 'Quantity is required';
    }
    if (!formData.price.trim()) {
      errors.price = 'Price is required';
    }
    if (!formData.transType) {
      errors.transType = 'Transaction Type is required';
    }
    if (!formData.stockSts) {
      errors.stockSts = 'Stock Status is required';
    }

    // Validate number fields
    if (formData.quantity.trim() && isNaN(formData.quantity.trim())) {
      errors.quantity = 'Quantity must be a number';
    }
    if (formData.price.trim() && isNaN(formData.price.trim())) {
      errors.price = 'Price must be a number';
    }

    if (Object.keys(errors).length === 0) {
      
      try {
        // Send form data to the backend endpoint
        const response =  await axios.post('http://localhost:8080/api/v1/buysell', formData);
        console.log('Data saved successfully:', response.data);
        // Reset the form after successful submission
        setFormData({
          name: '',
          quantity: '',
          price: '',
          transType: '',
          stockSts: ''
        });

        // Set submission status to success
        setSubmissionStatus('success');
      } catch (error) {
        console.error('Error saving data:', error);
      }

    } else {
      // Form has errors, display them
      setErrors(errors);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Product Details</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        {/* Form fields */}
        {/* Display success message if submission was successful */}
        {submissionStatus === 'success' && (
          <p className="text-green-500 font-bold text-center mb-4">Product submitted successfully!</p>
        )}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.name ? 'border-red-500' : ''
            }`}
            id="name"
            type="text"
            placeholder="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-xs italic">{errors.name}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantity">
            Quantity
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.quantity ? 'border-red-500' : ''
            }`}
            id="quantity"
            type="text"
            placeholder="Quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          {errors.quantity && <p className="text-red-500 text-xs italic">{errors.quantity}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
            Price
          </label>
          <input
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.price ? 'border-red-500' : ''
            }`}
            id="price"
            type="text"
            placeholder="Price"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
          {errors.price && <p className="text-red-500 text-xs italic">{errors.price}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="transType">
            Transaction Type
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.transType ? 'border-red-500' : ''
            }`}
            id="transType"
            name="transType"
            value={formData.transType}
            onChange={handleChange}
          >
            <option value="">Select Transaction Type</option>
            <option value="BUY">Buy</option>
            <option value="SELL">Sell</option>
          </select>
          {errors.transType && <p className="text-red-500 text-xs italic">{errors.transType}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="stockSts">
            Stock Status
          </label>
          <select
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.stockSts ? 'border-red-500' : ''
            }`}
            id="stockSts"
            name="stockSts"
            value={formData.stockSts}
            onChange={handleChange}
          >
            <option value="">Select Stock Status</option>
            <option value="OPEN">OPEN</option>
            <option value="PARTIAL">PARTIAL</option>
            <option value="CLOSED">CLOSED</option>
          </select>
          {errors.stockSts && <p className="text-red-500 text-xs italic">{errors.stockSts}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Dashboard;
