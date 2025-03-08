import { Card } from "../components/ui/card";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Product } from "../types/product";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "../hooks/useTranslation";

const Products = () => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const { data: products = [], isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => {
      const products = localStorage.getItem("products");
      return Promise.resolve(products ? JSON.parse(products) : []);
    },
  });

  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleEditClick = (product) => {
    setEditingProductId(product.id);
    setEditedProduct({
      productName: product.productName,
      price: product.price,
      quantity: product.quantity,
      description: product.description,
      address: product.address,
    });
  };

  const handleDeleteClick = (productId) => {
    const updatedProducts = products.filter((product) => product.id !== productId);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    queryClient.invalidateQueries(["products"]);
  };

  const handleSaveEdit = (productId) => {
    const updatedProducts = products.map((product) => {
      if (product.id === productId) {
        return { ...product, ...editedProduct };
      }
      return product;
    });
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditingProductId(null);
    queryClient.invalidateQueries(["products"]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 px-4 pb-8 bg-gray-50">
      <div className="flex justify-center space-x-8 mb-8">
        <Link to="/home" className="px-4 py-2 text-sm font-medium text-black hover:text-black transition-colors border-b-2 border-black">
          {t('addProduct')}
          
        </Link>
        <Link to="/view-products" className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors hover:border-b-2 hover:border-black">
          {t('viewProducts')}
        </Link>
      </div>
      <div className="max-w-screen-xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">{t('products2.All Products')}</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product, index) => (
            <Card key={product.id || index} className="overflow-hidden hover:shadow-lg transition-shadow duration-300 animate-fade-in">
              <img src={product.productImage} alt={product.productName} className="w-full h-48 object-cover" loading="lazy" />
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  {editingProductId === product.id ? (
                    <>
                      <input type="text" value={editedProduct.productName} onChange={(e) => setEditedProduct({ ...editedProduct, productName: e.target.value })} className="border rounded p-1 w-1/2" />
                      <input type="number" value={editedProduct.price} onChange={(e) => setEditedProduct({ ...editedProduct, price: e.target.value })} className="border rounded p-1 w-1/4" />
                    </>
                  ) : (
                    <>
                      <h3 className="font-semibold text-lg">{product.productName}</h3>
                      <span className="text-green-600 font-medium">${product.price}</span>
                    </>
                  )}
                </div>
                {editingProductId === product.id ? (
                  <>
                    <input type="number" value={editedProduct.quantity} onChange={(e) => setEditedProduct({ ...editedProduct, quantity: e.target.value })} className="border rounded p-1 mb-2 w-full" placeholder="Quantity" />
                    <textarea value={editedProduct.description} onChange={(e) => setEditedProduct({ ...editedProduct, description: e.target.value })} className="border rounded p-1 mb-2 w-full" placeholder="Description" />
                    <input type="text" value={editedProduct.address} onChange={(e) => setEditedProduct({ ...editedProduct, address: e.target.value })} className="border rounded p-1 mb-2 w-full" placeholder="Address" />
                  </>
                ) : (
                  <>
                    <p className="text-sm text-gray-600 mb-2">Quantity: {product.quantity}</p>
                    <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
                    <p className="text-xs text-gray-400 mt-2">{product.address}</p>
                  </>
                )}
                <div className="flex justify-between mt-4">
                  {editingProductId === product.id ? (
                    <>
                      <button onClick={() => handleSaveEdit(product.id)} className="px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
                      <button onClick={() => setEditingProductId(null)} className="px-2 py-1 bg-gray-300 text-black rounded hover:bg-gray-400">Cancel</button>
                    </>
                  ) : (
                    <>
                      <button onClick={() => handleEditClick(product)} className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600">Edit</button>
                      <button onClick={() => handleDeleteClick(product.id)} className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
        {products.length === 0 && <div className="text-center text-gray-500 mt-8">No products available.</div>}
      </div>
    </div>
  );
};

export default Products;
