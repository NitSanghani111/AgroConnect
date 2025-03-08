import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { useTranslation } from "../../hooks/useTranslation";
import { LanguageSelector } from "../../components/LanguageSelector";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const BuyerAnalytics = () => {
  const { t } = useTranslation();
  
  // Sample data with translation keys
  const cityProductData = [
    { city: t('buyerAnalytics.cities.mumbai'), products: 150, productName: t('buyerAnalytics.products.tomatoes') },
    { city: t('buyerAnalytics.cities.delhi'), products: 120, productName: t('buyerAnalytics.products.potatoes') },
    { city: t('buyerAnalytics.cities.bangalore'), products: 200, productName: t('buyerAnalytics.products.onions') },
    { city: t('buyerAnalytics.cities.chennai'), products: 80, productName: t('buyerAnalytics.products.carrots') },
    { city: t('buyerAnalytics.cities.kolkata'), products: 100, productName: t('buyerAnalytics.products.cucumbers') },
  ];

  const buyerQuantityData = [
    { name: t('buyerAnalytics.buyers.johnDoe'), quantity: 50 },
    { name: t('buyerAnalytics.buyers.janeSmith'), quantity: 75 },
    { name: t('buyerAnalytics.buyers.bobJohnson'), quantity: 45 },
    { name: t('buyerAnalytics.buyers.aliceBrown'), quantity: 90 },
    { name: t('buyerAnalytics.buyers.charlieWilson'), quantity: 60 },
  ];

  const productProfitData = [
    { product: t('buyerAnalytics.products.tomatoes'), profit: 15000, buyerName: t('buyerAnalytics.buyers.johnDoe') },
    { product: t('buyerAnalytics.products.potatoes'), profit: 12000, buyerName: t('buyerAnalytics.buyers.janeSmith') },
    { product: t('buyerAnalytics.products.onions'), profit: 18000, buyerName: t('buyerAnalytics.buyers.bobJohnson') },
    { product: t('buyerAnalytics.products.carrots'), profit: 9000, buyerName: t('buyerAnalytics.buyers.aliceBrown') },
    { product: t('buyerAnalytics.products.cucumbers'), profit: 13500, buyerName: t('buyerAnalytics.buyers.charlieWilson') },
  ];

  const productDiscountData = [
    { name: t('buyerAnalytics.products.tomatoes'), value: 15 },
    { name: t('buyerAnalytics.products.potatoes'), value: 20 },
    { name: t('buyerAnalytics.products.onions'), value: 10 },
    { name: t('buyerAnalytics.products.carrots'), value: 25 },
    { name: t('buyerAnalytics.products.cucumbers'), value: 30 },
  ];

  const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#2DD4BF', '#F43F5E'];
  
  return (
    <div className="min-h-screen bg-gray-50 p-2 mt-20">
      <div className="container mx-auto">
        <div className="flex justify-end mb-4 space-x-2">
          
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">{t('buyerAnalytics.title')}</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* City vs Products Bought */}
          <Card>
            <CardHeader>
              <CardTitle>{t('buyerAnalytics.cityProducts')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={cityProductData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="city" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="products" 
                    fill="#8B5CF6"
                    radius={[4, 4, 0, 0]}
                    name={t('buyerAnalytics.productsBought')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Buyer Name vs Product Quantity */}
          <Card>
            <CardHeader>
              <CardTitle>{t('buyerAnalytics.buyerQuantity')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={buyerQuantityData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="quantity" 
                    stroke="#D946EF" 
                    strokeWidth={2}
                    dot={{ fill: '#D946EF' }}
                    name={t('buyerAnalytics.quantity')}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product vs Profit with Buyer Information */}
          <Card>
            <CardHeader>
              <CardTitle>{t('buyerAnalytics.productProfit')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productProfitData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="product" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar 
                    dataKey="profit" 
                    fill="#F97316"
                    radius={[4, 4, 0, 0]}
                    name={t('buyerAnalytics.profit')}
                  />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Product vs Discount */}
          <Card>
            <CardHeader>
              <CardTitle>{t('buyerAnalytics.productDiscount')}</CardTitle>
            </CardHeader>
            <CardContent className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productDiscountData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={150}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {productDiscountData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BuyerAnalytics;