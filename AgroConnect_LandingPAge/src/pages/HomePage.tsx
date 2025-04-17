import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  ArrowRight,
  ChevronRight,
  Star,
  ShoppingCart,
  LineChart,
  Wallet,
  Shield,
  Truck,
  Headphones,
  TrendingUp,
  Package,
  User,
  MapPin,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Card, CardContent } from "../components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../components/ui/carousel";
import { type ProductType } from "../types/product";
import { useState } from "react";

// Create components for AnimatedText and AnimatedNumber
const AnimatedText = ({ text, className, delay }: { text: string, className: string, delay?: number }) => {
  return <div className={className}>{text}</div>;
};

const AnimatedNumber = ({ value }: { value: number }) => {
  return <span>{value}</span>;
};

export default function HomePage() {
  const {t} = useTranslation(); // Simple translation function placeholder
  
  const features = [
    {
      title: t("features.directMarket.title"),
      description: t("features.directMarket.description"),
      icon: ShoppingCart,
    },
    {
      title: t("features.smartPrice.title"),
      description: t("features.smartPrice.description"),
      icon: LineChart,
    },
    {
      title: t("features.securePayments.title"),
      description: t("features.securePayments.description"),
      icon: Wallet,
    },
    {
      title: t("features.qualityAssurance.title"),
      description: t("features.qualityAssurance.description"),
      icon: Shield,
    },
    {
      title: t("features.logistics.title"),
      description: t("features.logistics.description"),
      icon: Truck,
    },
    {
      title: t("features.support.title"),
      description: t("features.support.description"),
      icon: Headphones,
    },
  ];
  
  const stats = [
    { value: 10000, suffix: "+", label: t("stats.farmers") },
    { value: 5000, suffix: "+", label: t("stats.buyers") },
    { value: 50000000, suffix: "", label: t("stats.volume") },
    { value: 30, suffix: "%", label: t("stats.earnings") },
  ];

  const featuredProducts: ProductType[] = [
    {
      id: 1,
      images: [
        "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Organic Apples'),
      description: t('products.Fresh, crisp apples grown without pesticides'),
      farmerName: t('products.farmerNames.John Smith'),
      farmerCity: t('products.cities.New York'),
      quality: 4.5,
      category: "Fruits",
      quantity: "500 kg",
      priceRange: { min: 200, max: 300 },
      price: 0
    },
    {
      id: 2,
      images: [
        "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?w=500&auto=format&fit=crop&q=60"
      ],
      name: t('products.Fresh Mangoes'),

      description: t('products.Sweet and juicy mangoes from local orchards'),
      farmerName: t('products.farmerNames.Rajesh Kumar'),
      farmerCity: t('products.cities.Mumbai'),
      quality: 4.8,
      category: "Fruits",
      quantity: "300 kg",
      priceRange: { min: 150, max: 200 },
      price: 0
    },
    {
      id: 3,
      images: [
        "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Organic Wheat'),
      description: t('products.Premium quality wheat grains, perfect for bread and rotis'),
      farmerName: t('products.farmerNames.Amit Patel'),
      farmerCity: t('products.cities.Delhi'),
      quality: 5,
      category: "Grains",
      quantity: "1000 kg",
      priceRange: { min: 70, max: 100 },
      price: 0
    },
    {
      id: 4,
      images: [
        "https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Kesar Mango'),

      description: t('products.Premium Gir Kesar mangoes, known for their sweet taste and aroma'),
      farmerName: t('products.farmerNames.Rajesh Patel'),
      farmerCity: t('products.cities.Junagadh'),
      quality: 5,
      category: "Fruits",
      quantity: "500 kg",
      priceRange: { min: 200, max: 300 },
      price: 0
    },
    // Additional products for second slide
   
    {
      id: 6,
      images: [
        "https://images.unsplash.com/photo-1587132137056-bfbf0166836e?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Red Banana'),

      description: t('products.Sweet and nutritious red bananas from Kerala'),
      farmerName: t('products.farmerNames.Thomas Joseph'),
      farmerCity: t('products.cities.Kochi'),
      quality: 4.9,
      category: "Fruits",
      quantity: "2000 kg",
      priceRange: { min: 75, max: 90 },
      price: 0
    },
    {
      id: 7,
      images: [
        "https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Red Rice'),

      description: t('products.Traditional Kerala red rice, rich in nutrients'),
      farmerName: t('products.farmerNames.Mathew Philip'),
      farmerCity: t('products.cities.Thrissur'),
      quality: 4.6,
      category: "Grains",
      quantity: "100 kg",
      priceRange: { min: 160, max: 200 },
      price: 0
    },
    {
      id: 8,
      images: [
        "https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=800&q=80"
      ],
      name: t('products.Alphonso mango'),

      description: t('products.Premium Ratnagiri Alphonso mangoes'),
      farmerName: t('products.farmerNames.Suresh Desai'),
      farmerCity: t('products.cities.Ratnagiri'),
      quality: 4.7,
      category: "fruits",
      quantity: "750 kg",
      priceRange: { min: 85, max: 110 },
      price: 0
    }
  ];

  // Group products into slides of 4
  const productSlides = [];
  for (let i = 0; i < featuredProducts.length; i += 4) {
    productSlides.push(featuredProducts.slice(i, i + 4));
  }



  // State to track which product is being hovered
  const [hoveredProductId, setHoveredProductId] = useState<number | null>(null);
  
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden">
      
        <div className="relative w-full h-full">
          {/* Light Background Image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-70"
            style={{
              backgroundImage: "url('https://images.pexels.com/photos/440731/pexels-photo-440731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
              opacity: 0.3,
            }}
          />
          {/* Light Gradient Overlay */}
          <div
            className="absolute inset-0 bg-gradient-to-b from-white/60 via-white/50 to-white/30"
            style={{
              maskImage: "linear-gradient(to bottom, white, transparent)",
              WebkitMaskImage: "linear-gradient(to bottom, white, transparent)",
            }}
          />
        </div>
        
        <div className="container relative z-10">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-medium bg-background/30 backdrop-blur-sm">
                <span className="relative flex size-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full size-2 bg-green-500"></span>
                </span>
                {t('hero1.tagline')}
              </div>
              <AnimatedText
                text={t("hero.title")}
                className="text-4xl md:text-5xl font-bold tracking-tighter"
              />
              <AnimatedText
                text={t('hero1.subtitle')}
                className="text-xl text-muted-foreground"
                delay={5}
              />
              <div className="flex flex-col sm:flex-row gap-4">
              
                <Button
                  asChild
                  size="lg"
                  className="bg-green-600 hover:bg-green-700 group relative overflow-hidden transition-all duration-300"
                >
                  <Link to="/register">
                    {t('hero1.getStarted')}
                    <ChevronRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="group relative overflow-hidden transition-all duration-300"
                >
                  <Link to="/about">
                    {t('hero1.learnMore')}
                  </Link>
                </Button>
              </div>
            </div>
            <div className="relative lg:ml-auto">
              <div className="relative">
                <img
                  src="https://th.bing.com/th/id/OIP.5DdOoter3uib5J55cohzXgHaE6?w=269&h=180&c=7&r=0&o=5&dpr=2&pid=1.7"
                  alt="Farmer using Agronet"
                  className="rounded-lg shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -left-6 bg-white rounded-lg shadow-xl p-4 animate-bounce-slow">
                  <div className="flex items-center gap-2">
                    <Star className="text-yellow-400 h-5 w-5 fill-current" />
                    <span className="font-medium">
                      Trusted by 10,000+ Farmers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 bg-slate-50">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text={t("features.title")}
              className="text-3xl font-bold mb-4"
            />
            <AnimatedText
              text={t("features.subtitle")}
              className="text-lg text-muted-foreground"
              delay={3}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: index * 0.1 }}
              >
                <Card className="group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-xl overflow-hidden relative">
                  <div className="absolute bottom-0 left-0 w-full bg-green-500/50 group-hover:animate-slide-up-bg z-0" />
                  <CardContent className="p-6 text-center relative z-10">
                    <div className="rounded-full w-12 mt-4 h-12 flex items-center justify-center bg-green-100 mx-auto mb-4 transition-colors group-hover:bg-green-200">
                      <feature.icon className="h-8 w-6 text-green-600 transition-colors group-hover:text-green-700" />
                    </div>
                    <h3 className="font-semibold mb-2 transition-colors group-hover:text-green-700">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground transition-colors group-hover:text-green-600/80">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      {/* Stats Section */}
      <section className="py-20 bg-green-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/206893/pexels-photo-206893.jpeg?auto=compress&cs=tinysrgb&w=600')] bg-cover bg-center opacity-10" />
        <div className="container relative">
          <div className="grid gap-8 md:grid-cols-4 text-center">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="p-6 rounded-lg backdrop-blur-sm transition-all duration-300 hover:scale-105"
              >
                <div className="text-4xl font-bold mb-2">
                  <AnimatedNumber value={stat.value} />
                  {stat.suffix}
                </div>
                <div className="text-green-100">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-50 via-white to-green-50" />
        <div className="container relative">
          <div className="max-w-3xl mx-auto text-center">
            <AnimatedText
              text={t("cta.title")}
              className="text-3xl font-bold mb-4"
            />
            <AnimatedText
              text={t("cta.subtitle")}
              className="text-xl text-muted-foreground mb-8"
              delay={3}
            />
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 group relative overflow-hidden"
            >
              <Link to="/register">
                {t("cta.button")}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Product Carousel Section - Updated with 4 products per slide */}
      <section className="py-20 bg-gradient-to-br from-green-200 via-white to-green-200">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <AnimatedText
              text={t("products.featuredProducts")}
              className="text-3xl font-bold mb-4"
            />
            <AnimatedText
              text={t("products.discoverProducts")}
              className="text-lg text-muted-foreground"
              delay={3}
            />
          </div>
          
          <Carousel className="w-full max-w-6xl mx-auto">
            <CarouselContent>
              {productSlides.map((slideProducts, slideIndex) => (
                <CarouselItem key={slideIndex}>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {slideProducts.map((product) => (
                      <div 
                        key={product.id} 
                        className="relative group"
                        onMouseEnter={() => setHoveredProductId(product.id)}
                        onMouseLeave={() => setHoveredProductId(null)}
                      >
                        <Card className="border-none shadow-lg overflow-hidden h-120">
                          <CardContent className="p-0 h-150">
                            <div className="relative h-150">
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-full h-60 object-cover"
                              />
                              
                              {/* Product details - only visible on hover */}
                              <div 
                                className={`absolute inset-0 bg-black/70 flex flex-col justify-center text-white p-4 transition-opacity duration-300 ${
                                  hoveredProductId === product.id ? "opacity-100" : "opacity-0"
                                }`}
                              >
                                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                                <div className="flex items-center gap-1 mb-2">
                                  
                                </div>
                                <p className="text-sm mb-2 line-clamp-2">{product.description}</p>
                                
                                <div className="space-y-2 mt-auto">
                                  <div className="flex items-center gap-2 text-sm">
                                    <TrendingUp className="w-4 h-4" />
                                    <span>₹{product.priceRange.min} - ₹{product.priceRange.max}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <Package className="w-4 h-4" />
                                    <span>{product.quantity}</span>
                                  </div>
                                  <div className="flex items-center gap-2 text-sm">
                                    <User className="w-4 h-4" />
                                    <span>{product.farmerName}</span>
                                  </div>
                                  {product.farmerCity && (
                                    <div className="flex items-center gap-2 text-sm">
                                      <MapPin className="w-4 h-4" />
                                      <span>{product.farmerCity}</span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                            
                            {/* Product name always visible */}
                           
                          </CardContent>
                        </Card>
                      </div>
                    ))}
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className="hidden md:block">
              <CarouselPrevious className="-left-12 bg-green-50 hover:bg-green-100 border-green-200" />
              <CarouselNext className="-right-12 bg-green-50 hover:bg-green-100 border-green-200" />
            </div>
          </Carousel>

          <div className="mt-12 text-center">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 group"
            >
              <Link to="/Product">
                {t("products.showMore")}
                <ArrowRight className="ml-2 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}