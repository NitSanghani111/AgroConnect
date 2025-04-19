import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRecoilValue } from 'recoil';
import tokenAtom from '../hooks/tokenAtom';

const AddProduct: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    minQuantity: '',
    unit: '',
    priceMin: '',
    priceMax: '',
    images: [] as File[],
    qualityCertificateNo: '',
    qualityParameters: '',
    extraDetails: '',
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const token = useRecoilValue(tokenAtom)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const fileArray = Array.from(files);
    const urls = fileArray.map(file => URL.createObjectURL(file));
    setImagePreviews(urls);
    setFormData({ ...formData, images: fileArray });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.unit) {
      alert('Please select a valid unit.');
      return;
    }

    const data = new FormData();
    data.append('name', formData.name);
    data.append('category', formData.category);
    data.append('minQuantity', formData.minQuantity);
    data.append('unit', formData.unit);
    data.append('priceMin', formData.priceMin);
    data.append('priceMax', formData.priceMax);
    data.append('qualityCertificateNo', formData.qualityCertificateNo);
    data.append('qualityParameters', formData.qualityParameters);
    data.append('extraDetails', formData.extraDetails);

    formData.images.forEach(image => data.append('images', image));

    try {
      const response = await axios.post('http://localhost:5000/api/product/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`, // Include the token
        },
      });

      toast.success('Product submitted successfully!');
      console.log('Server response:', response.data);

      setFormData({
        name: '',
        category: '',
        minQuantity: '',
        unit: '',
        priceMin: '',
        priceMax: '',
        images: [],
        qualityCertificateNo: '',
        qualityParameters: '',
        extraDetails: '',
      });
      setImagePreviews([]);
    } catch (error) {
      console.error('Error submitting product:', error);
      toast.error('Failed to submit product.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4 mt-10">
      <ToastContainer />
      <div className="flex justify-between items-center max-w-4xl mx-auto mb-6">
        <h1 className="text-3xl font-bold text-green-800">Add New Product</h1>
        <Link to="/manageProduct" className="text-green-700 hover:underline text-lg">
          Manage Product
        </Link>
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-xl grid grid-cols-1 md:grid-cols-2 gap-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div>
          <label className="block font-semibold text-gray-700 mb-1">Product Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Category</label>
          <input
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Min Quantity</label>
          <input
            name="minQuantity"
            type="number"
            value={formData.minQuantity}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Unit</label>
          <select
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          >
            <option value="" disabled>Select Unit</option>
            <option value="kg">Kg</option>
            <option value="ton">Ton</option>
            <option value="litre">Litre</option>
            <option value="quintal">Quintal</option>
            <option value="g">Gram</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Price Min</label>
          <input
            name="priceMin"
            type="number"
            value={formData.priceMin}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-1">Price Max</label>
          <input
            name="priceMax"
            type="number"
            value={formData.priceMax}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            required
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">Upload Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border rounded-lg"
            required
          />
          <div className="flex flex-wrap mt-2 gap-2">
            {imagePreviews.map((src, idx) => (
              <img
                key={idx}
                src={src}
                alt={`Preview ${idx}`}
                className="h-24 w-24 object-cover rounded-lg border"
              />
            ))}
          </div>
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">Quality Certificate No.</label>
          <input
            name="qualityCertificateNo"
            value={formData.qualityCertificateNo}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">Quality Parameters</label>
          <input
            name="qualityParameters"
            value={formData.qualityParameters}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-semibold text-gray-700 mb-1">Extra Details</label>
          <textarea
            name="extraDetails"
            value={formData.extraDetails}
            onChange={handleChange}
            className="w-full p-2 border rounded-lg"
            rows={3}
          />
        </div>

        <div className="md:col-span-2 flex justify-end">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-all"
          >
            Submit Product
          </button>
        </div>
      </motion.form>
    </div>
  );
};

export default AddProduct;
