"use client"

import type React from "react"
import { useEffect, useState } from "react"
import axios from "axios"
import { Input } from "../../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { motion } from "framer-motion"
import { Card, CardContent } from "../../components/ui/card"
import { Search, Tag, Package2, User, Phone, Mail, MapPin } from "lucide-react"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useRecoilValue } from "recoil"
import tokenAtom from "../../hooks/tokenAtom"

// Add custom styles for the slider
const sliderStyles = `
  .custom-slider .slick-dots {
    bottom: 10px;
  }
  
  .custom-slider .slick-dots li button:before {
    color: white;
    opacity: 0.7;
    font-size: 8px;
    text-shadow: 0 0 3px rgba(0, 0, 0, 0.5);
  }
  
  .custom-slider .slick-dots li.slick-active button:before {
    color: white;
    opacity: 1;
  }
  
  .custom-slider .slick-prev,
  .custom-slider .slick-next {
    z-index: 1;
    width: 30px;
    height: 30px;
    background: rgba(255, 255, 255, 0.8);
    border-radius: 50%;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .custom-slider .slick-prev {
    left: 10px;
  }
  
  .custom-slider .slick-next {
    right: 10px;
  }
  
  .custom-slider .slick-prev:before,
  .custom-slider .slick-next:before {
    color: #333;
    font-size: 16px;
  }
`

interface FarmerId {
  _id: string
  firstName: string
  lastName: string
  email: string
  phone: string
  state: string
  country: string
}

interface Product {
  _id: string
  name: string
  category: string
  unit: string
  priceRange: {
    min: number
    max: number
  }
  extraDetails: string
  images: string[]
  minQuantity: number
  farmerId: FarmerId
  // Derived fields for convenience
  farmerName?: string
  contact?: string
  location?: string
}

const BuyerProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showModal, setShowModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const token = useRecoilValue(tokenAtom)

  const fetchProducts = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await axios.get("http://localhost:5000/api/product/products", {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in the Authorization header
        },
      });
      console.log("API Response:", response.data)

      const processedProducts = response.data.map((product: any) => {
        // Log each product's farmerId to debug
        console.log(`Product ${product._id} farmerId:`, product.farmerId)

        // Process the product data
        const farmerName = product.farmer
          ? `${product.farmer.firstName || ""} ${product.farmer.lastName || ""}`.trim() || "Unnamed Farmer"
          : "Unnamed Farmer"

        const location = product.farmer.state || product.farmer.country || "Unknown Location"

        return {
          ...product,
          farmerName,
          contact: product.farmer.phone || "No contact",
          location,
        }
      })

      setProducts(processedProducts)
    } catch (error) {
      console.error("Error fetching products:", error)
      setError("Failed to load products. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  const categories = [...new Set(products.map((product) => product.category))]
  const locations = [...new Set(products.map((product) => product.location || "Unknown"))]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory
    const matchesLocation = selectedLocation === "all" || product.location === selectedLocation
    return matchesSearch && matchesCategory && matchesLocation
  })

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    className: "custom-slider",
  }

  return (
    <div className="min-h-screen bg-[#F7F9FC] pb-12">
      {/* Add the custom slider styles */}
      <style>{sliderStyles}</style>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-700 to-emerald-600 text-white py-16"
      >
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Available Products</h1>
          <p className="text-lg opacity-90">Browse and filter fresh produce from verified sellers.</p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 -mt-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl shadow-lg p-6 mb-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search by name..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {selectedCategory === "all" ? "All Categories" : selectedCategory}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={selectedLocation} onValueChange={setSelectedLocation}>
              <SelectTrigger>
                <SelectValue>
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4" />
                    {selectedLocation === "all" ? "All Locations" : selectedLocation}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.map((loc) => (
                  <SelectItem key={loc} value={loc}>
                    {loc}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-500">{error}</p>
            <button
              onClick={fetchProducts}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-gray-500">No products found matching your criteria.</p>
              </div>
            ) : (
              filteredProducts.map((product) => (
                <motion.div
                  key={product._id}
                  onClick={() => {
                    setSelectedProduct(product)
                    setShowModal(true)
                  }}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -4, scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col cursor-pointer"
                >
                  <Card className="flex-1 overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300 border border-gray-100">
                    <div className="relative pt-[75%]">
                      <img
                        src={`http://localhost:5000${product.images?.[0]}`}
                        alt={product.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                      />
                      {product.location && (
                        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium text-gray-700 shadow-sm">
                          {product.location}
                        </div>
                      )}
                    </div>
                    <CardContent className="p-5">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold line-clamp-1">{product.name}</h3>
                          <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                        </div>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <p className="text-green-700 font-bold">
                          ₹{product.priceRange.min} - ₹{product.priceRange.max} / {product.unit}
                        </p>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between">
                        <p className="text-xs font-medium text-gray-500">
                          Min: {product.minQuantity}
                          {product.unit}
                        </p>
                        <span className="text-xs bg-green-50 text-green-700 px-2 py-1 rounded-full">
                          {product.farmerName}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))
            )}
          </div>
        )}

        {showModal && selectedProduct && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-xl p-6 max-w-4xl w-full shadow-2xl relative grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden max-h-[90vh] overflow-y-auto"
            >
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-4 right-4 bg-white/80 backdrop-blur-sm rounded-full w-8 h-8 flex items-center justify-center text-gray-600 hover:text-red-500 z-10 shadow-md"
              >
                ✖
              </button>
              <div className="overflow-hidden rounded-lg shadow-inner">
                <Slider {...sliderSettings}>
                  {selectedProduct.images.map((img, index) => (
                    <div key={index} className="outline-none">
                      <img
                        src={`http://localhost:5000${img}`}
                        alt={`${selectedProduct.name} - Image ${index + 1}`}
                        className="w-full h-72 object-cover"
                      />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="flex flex-col">
                <div className="mb-4">
                  <div className="flex justify-between items-start">
                    <h2 className="text-2xl font-bold">{selectedProduct.name}</h2>
                    {selectedProduct.location && (
                      <span className="bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                        {selectedProduct.location}
                      </span>
                    )}
                  </div>
                  <p className="text-gray-500">{selectedProduct.category}</p>
                </div>

                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">Price Range:</span>
                    <span className="font-semibold text-green-700">
                      ₹{selectedProduct.priceRange.min} - ₹{selectedProduct.priceRange.max} / {selectedProduct.unit}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Minimum Order:</span>
                    <span className="font-semibold">
                      {selectedProduct.minQuantity}
                      {selectedProduct.unit}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-4 mb-4">
                  <h3 className="font-semibold mb-3 flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Seller Information
                  </h3>
                  <div className="grid gap-3">
                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                      <User className="w-4 h-4 text-green-600" />
                      <span className="text-gray-500">Farmer:</span>
                      <span className="font-medium ml-auto">{selectedProduct.farmerName}</span>
                    </div>

                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                      <Phone className="w-4 h-4 text-green-600" />
                      <span className="text-gray-500">Contact:</span>
                      <span className="font-medium ml-auto">{selectedProduct.contact}</span>
                    </div>

                    {selectedProduct.farmerId?.email && (
                      <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                        <Mail className="w-4 h-4 text-green-600" />
                        <span className="text-gray-500">Email:</span>
                        <span className="font-medium ml-auto">{selectedProduct.farmerId.email}</span>
                      </div>
                    )}

                    <div className="flex items-center gap-2 bg-gray-50 p-2 rounded-md">
                      <MapPin className="w-4 h-4 text-green-600" />
                      <span className="text-gray-500">Location:</span>
                      <span className="font-medium ml-auto">
                        {selectedProduct.farmerId?.state || "N/A"}
                        {selectedProduct.farmerId?.country ? `, ${selectedProduct.farmerId.country}` : ""}
                      </span>
                    </div>
                  </div>
                </div>

                {selectedProduct.extraDetails && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-1">Additional Details</h3>
                    <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">{selectedProduct.extraDetails}</p>
                  </div>
                )}

                <div className="mt-auto flex gap-3">
                  <button className="flex-1 px-4 py-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors font-medium shadow-sm">
                    Negotiate Price
                  </button>
                  <button className="flex-1 px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium shadow-sm">
                    Contact Seller
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

export default BuyerProducts
