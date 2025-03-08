import { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { Package2, Search, Tag } from "lucide-react";
import { motion } from "framer-motion";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import ProductDetailsModal from "../../components/ProductDetailsModal";
import { useTranslation } from "../../hooks/useTranslation";
import { LanguageSelector } from "../../components/LanguageSelector";

const productsData = [
  { 
    id: 1, 
    name: 'Premium Apples', 
    category: 'Fruits', 
    city: 'Maharashtra', 
    price: '₹120/kg', 
    images: [
      'https://images.unsplash.com/photo-1619546813926-a78fa6372cd2?q=80&w=1000&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1661322640130-f6a1e2c36653?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8YXBwbGV8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1576179635662-9d1983e97e1e?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGFwcGxlfGVufDB8fDB8fHww'
    ],
    buyerName: 'Krishna Farms', 
    quantity: '200 kg', 
    description: 'Fresh and juicy apples.', 
    quality: 'Organic' 
  },
  { 
    id: 2, 
    name: 'Organic Mangoes', 
    category: 'Fruits', 
    city: 'Gujarat', 
    price: '₹150/kg', 
    images: [
      'https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1000&auto=format&fit=crop',
      'https://media.istockphoto.com/id/1398814319/photo/indian-mangoes-in-basket-blue-dark-background-close-up-view.webp?a=1&b=1&s=612x612&w=0&k=20&c=tbT1cRMy7dD6wU167vj39UuEA8FD78s8NgMZLbCY9ZU=',
      'https://media.istockphoto.com/id/1318973540/photo/indian-alphonso-mango-fruits-in-grass-closeup.webp?a=1&b=1&s=612x612&w=0&k=20&c=wQWrNbWQgsJbWUSx3a7thHRVLld3DxrVWrTAcyf_dU0='
    ],
    buyerName: 'Sunshine Orchards', 
    quantity: '150 kg', 
    description: 'Ripe mangoes, perfect for smoothies.', 
    quality: 'Organic' 
  },
  { 
    id: 3, 
    name: 'Fresh Tomatoes', 
    category: 'Vegetables', 
    city: 'Karnataka', 
    price: '₹40/kg', 
    images: [
      'https://images.unsplash.com/photo-1524593166156-312f362cada0?q=80&w=1000&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1726138646616-ec9fb0277048?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFRvbWF0b2VzfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1726138646616-ec9fb0277048?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fFRvbWF0b2VzfGVufDB8fDB8fHww'
    ],
    buyerName: 'Green Valley', 
    quantity: '100 kg', 
    description: 'High-quality tomatoes for cooking.', 
    quality: 'Fresh' 
  },
  { 
    id: 4, 
    name: 'Basmati Rice', 
    category: 'Grains', 
    city: 'Punjab', 
    price: '₹85/kg', 
    images: [
      'https://images.unsplash.com/photo-1586201375761-83865001e31c?q=80&w=1000&auto=format&fit=crop',
      'https://plus.unsplash.com/premium_photo-1723925093264-40b6b957c44d?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YmFzbWF0aSUyMHJpY2V8ZW58MHx8MHx8fDA%3D',
      'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fGJhc21hdGklMjByaWNlfGVufDB8fDB8fHww'
    ],
    buyerName: 'Golden Fields', 
    quantity: '500 kg', 
    description: 'Long-grain basmati rice, perfect for meals.', 
    quality: 'Aged' 
  },
  { 
    id: 5, 
    name: 'Carrots', 
    category: 'Vegetables', 
    city: 'Haryana', 
    price: '₹30/kg', 
    images: [
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2Fycm90fGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2Fycm90c3xlbnwwfHwwfHx8MA%3D%3D',
      'https://media.istockphoto.com/id/917581076/photo/fresh-carrot-with-slice-on-wooden-background.webp?a=1&b=1&s=612x612&w=0&k=20&c=QWE-oEX9KnEVIQl53bFNRBELK83DLsAianJLu04m_R4='
    ],
    buyerName: 'Fresh Farms', 
    quantity: '80 kg', 
    description: 'Crunchy and sweet carrots.', 
    quality: 'Organic' 
  },
  { 
    id: 6, 
    name: 'Potatoes', 
    category: 'Vegetables', 
    city: 'Madhya Pradesh', 
    price: '₹25/kg', 
    images: [
      'https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cG90YXRvfGVufDB8fDB8fHww',
      'https://plus.unsplash.com/premium_photo-1677528816982-673398569f03?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG90YXRvZXN8ZW58MHx8MHx8fDA%3D',
      'https://plus.unsplash.com/premium_photo-1667115593045-3a5aec9f4f4f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fHBvdGF0b2VzfGVufDB8fDB8fHww'
    ],
    buyerName: 'Farm Fresh', 
    quantity: '300 kg', 
    description: 'Versatile and delicious potatoes.', 
    quality: 'Fresh' 
  },
  { 
    id: 7, 
    name: 'Onions', 
    category: 'Vegetables', 
    city: 'Andhra Pradesh', 
    price: '₹20/kg', 
    images: [
      'https://images.unsplash.com/photo-1467019972079-a273e1bc9173?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fG9uaW9uc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1620574387735-3624d75b2dbc?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8b25pb25zfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1605197378298-02bf0af1c896?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fG9uaW9uc3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    buyerName: 'Onion Growers', 
    quantity: '150 kg', 
    description: 'Fresh onions for cooking.', 
    quality: 'Organic' 
  },
  { 
    id: 8, 
    name: 'Garlic', 
    category: 'Vegetables', 
    city: 'Gujarat', 
    price: '₹60/kg', 
    images: [
      'https://plus.unsplash.com/premium_photo-1666877049261-ea88f75e7be2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGdhcmxpY3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1605197378298-02bf0af1c896?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdhcmxpY3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1559454473-27bc85c67728?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGdhcmxpY3xlbnwwfHwwfHx8MA%3D%3D'
    ],
    buyerName: 'Garlic Farms', 
    quantity: '50 kg', 
    description: 'Strong and flavorful garlic.', 
    quality: 'Fresh' 
  },
  { 
    id: 9, 
    name: 'Chickpeas', 
    category: 'Legumes', 
    city: 'Rajasthan', 
    price: '₹100/kg', 
    images: [
      'https://plus.unsplash.com/premium_photo-1675237625827-38268aafc571?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8Y2hpY2twZWFzfGVufDB8fDB8fHww',
      'https://images.unsplash.com/photo-1515543904379-3d757afe72e4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2hpY2twZWFzfGVufDB8fDB8fHww',
      'https://media.istockphoto.com/id/1327960998/photo/boiled-chickpeas-in-bowl.webp?a=1&b=1&s=612x612&w=0&k=20&c=JyoV-9kqtOMeC-GBlcnssThBsU3ns409UsOdshUw0m8='
    ],
    buyerName: 'Legume Growers', 
    quantity: '200 kg', 
    description: 'High-protein chickpeas.', 
    quality: 'Organic' 
  },
  { 
    id: 10, 
    name: 'Lentils', 
    category: 'Legumes', 
    city: 'Punjab', 
    price: '₹90/kg', 
    images: [
      'https://plus.unsplash.com/premium_photo-1671130295987-13d3b3b4e9dc?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8bGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://plus.unsplash.com/premium_photo-1671130295825-402e525e7834?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bGVudGlsc3xlbnwwfHwwfHx8MA%3D%3D',
      'https://images.unsplash.com/photo-1615485500551-a968b29b07fa?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fGxlbnRpbHN8ZW58MHx8MHx8fDA%3D'
    ],
    buyerName: 'Lentil Farms', 
    quantity: '150 kg', 
    description: 'Nutritious lentils for cooking.', 
    quality: 'Fresh' 
  }
];

const BuyerProducts = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const productsPerPage = 8;

  const categories = [...new Set(productsData.map(product => product.category))];
  const locations = [...new Set(productsData.map(product => product.city))];

  const filteredProducts = productsData.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesLocation = selectedLocation === "all" || product.city === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  const handleKnowMoreClick = (product: any) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <div className="min-h-screen bg-[#F7F9FC]">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-green-700 to-indigo-800 text-white py-16"
      >
        <div className="container mx-auto px-4 mt-6 flex justify-between items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('title')}</h1>
            <p className="text-lg opacity-90 max-w-2xl">
              {t('description')}
            </p>
          </div>
          <div>
            
          </div>
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
                placeholder={t('searchPlaceholder')}
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <Select 
              value={selectedCategory} 
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger>
                <SelectValue defaultValue={selectedCategory}>
                  <div className="flex items-center gap-2">
                    <Tag className="h-4 w-4" />
                    {selectedCategory === "all" ? t('allCategories') : t(`categories.${selectedCategory}`)}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allCategories')}</SelectItem>
                {categories.map(category => (
                  <SelectItem key={category} value={category}>
                    {t(`categories.${category}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select 
              value={selectedLocation} 
              onValueChange={setSelectedLocation}
            >
              <SelectTrigger>
                <SelectValue defaultValue={selectedLocation}>
                  <div className="flex items-center gap-2">
                    <Package2 className="h-4 w-4" />
                    {selectedLocation === "all" ? t('allLocations') : t(`locations.${selectedLocation}`)}
                  </div>
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t('allLocations')}</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location}>
                    {t(`locations.${location}`)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {currentProducts.map(product => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
              className="flex flex-col"
            >
              <Card className="flex-1 overflow-hidden bg-white hover:shadow-xl transition-shadow duration-300">
                <div className="relative pt-[75%]">
                  <img 
                    src={product.images[0]} 
                    alt={t(`products.${product.name}`)}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-5">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {t(`products.${product.name}`)}
                  </h3>
                  <div className="space-y-1">
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('category')}:</span> {t(`categories.${product.category}`)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('location')}:</span> {t(`locations.${product.city}`)}
                    </p>
                    <p className="text-lg font-bold text-purple-700 my-2">{product.price}</p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('seller')}:</span> {t(`buyers.${product.buyerName}`)}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('available')}:</span> {product.quantity}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-medium">{t('quality')}:</span> {t(`qualities.${product.quality}`)}
                    </p>
                    <p className="text-sm text-gray-600 mt-2">{t(`descriptions.${product.name}`)}</p>
                    <button
                      onClick={() => handleKnowMoreClick(product)}
                      className="mt-4 w-full bg-purple-700 text-white py-2 rounded-lg hover:bg-purple-800 transition-colors duration-200"
                    >
                      {t('knowMore')}
                    </button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-gray-500 text-lg">{t('noProductsFound')}</p>
          </motion.div>
        )}

{/* Pagination Controls */}
{filteredProducts.length > 0 && (
  <div className="flex items-center justify-between py-4">
    <button
      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
      disabled={currentPage === 1}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
    >
      {t('previous')}
    </button>
    <span className="text-sm text-purple-700 font-bold">
      {currentPage}
    </span>
    <span className="text-sm text-gray-600 mx-1">/</span> {/* Reduced margin */}
    <span className="text-sm text-purple-700 font-bold">
      {totalPages}
    </span>
    <button
      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
      disabled={currentPage === totalPages}
      className="bg-gray-200 text-gray-700 px-4 py-2 rounded disabled:opacity-50"
    >
      {t('next')}
    </button>
  </div>
)}
        {selectedProduct && (
          <ProductDetailsModal
            product={{
              id: selectedProduct.id,
              images: selectedProduct.images,
              name: t(`products.${selectedProduct.name}`),
              priceRange: {
                min: parseFloat(selectedProduct.price.replace(/[^0-9.-]+/g, "")),
                max: parseFloat(selectedProduct.price.replace(/[^0-9.-]+/g, "")) + 50,
              },
              description: t(`descriptions.${selectedProduct.name}`),
              farmerName: t(`buyers.${selectedProduct.buyerName}`),
              farmerCity: t(`locations.${selectedProduct.city}`),
              quality: selectedProduct.quality === "Organic" ? 5 : 4,
              category: t(`categories.${selectedProduct.category}`),
              quantity: selectedProduct.quantity,
            }}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
          />
        )}
      </div>
    </div>
  );
};

export  default BuyerProducts;