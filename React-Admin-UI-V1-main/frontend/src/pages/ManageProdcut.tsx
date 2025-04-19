import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";

interface Product {
  _id: string;
  name: string;
  images: string[];
  priceRange: {
    min: number;
    max: number;
  };
  minQuantity: number;
  unit: string;
  extraDetails: string;
}

const ManageProduct = () => {
  const { t } = useTranslation();
  const [products, setProducts] = useState<Product[]>([]);

  // 🔥 Read farmer ID from localStorage
  const farmerData = localStorage.getItem("farmer");
  const farmerId = farmerData ? JSON.parse(farmerData).id : null;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        if (!farmerId) return;

        const res = await fetch(`/api/products?farmerId=${farmerId}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [farmerId]);

  return (
    <div className="min-h-screen pt-8 px-4 pb-8 bg-gray-50">
      {/* Header and description */}
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-14 mx-auto">
          {t("title") || "Manage Your Products"}
        </h1>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <p className="text-lg text-gray-600 text-center">
          {t("description") || "View and manage your listed farm products below."}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex justify-center max-w-6xl mx-auto px-4 mb-8">
        <div className="flex space-x-8 py-4">
          <Link
            to="/manage-products"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors hover:border-b-2 hover:border-black"
          >
            {t("viewProducts") || "View Products"}
          </Link>
        </div>
      </div>

      {/* Product List */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length === 0 ? (
          <p className="text-center text-gray-500 col-span-full">
            {t("noProductsFound") || "No products found."}
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product._id}
              className="bg-white shadow-md rounded-xl p-4 border border-gray-100"
            >
              <div className="h-48 overflow-hidden mb-3 rounded-lg">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <h2 className="text-xl font-semibold mb-1">{product.name}</h2>
              <p className="text-gray-700 mb-1">
                {t("price") || "Price"}: ₹{product.priceRange.min} - ₹{product.priceRange.max}
              </p>
              <p className="text-gray-700 mb-1">
                {t("quantity") || "Minimum Quantity"}: {product.minQuantity} {product.unit}
              </p>
              <p className="text-sm text-gray-500">{product.extraDetails}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ManageProduct;
