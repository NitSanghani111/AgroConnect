import { useState } from "react";
import { Button } from "../components/ui/button";
import { Card } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../hooks/use-toast";
import { Link } from "react-router-dom";
import { useTranslation } from "../hooks/useTranslation";
import { LanguageSelector } from "../components/LanguageSelector";

interface Product {
  id?: string;
  productName: string;
  productImages: File[];
  price: number;
  quantity: number;
  description: string;
  address: string;
}

const AddProductForm = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const addProduct = useMutation({
    mutationFn: async (product: Product) => {
      const products = localStorage.getItem("products");
      const existingProducts: Product[] = products ? JSON.parse(products) : [];
      const newProduct = { ...product, id: crypto.randomUUID() };
      localStorage.setItem(
        "products",
        JSON.stringify([...existingProducts, newProduct])
      );
      return newProduct;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast({
        title: t("success"),
        description: t("productAdded"),
      });
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const images = formData.getAll("productImages") as File[]; // Get multiple files

    const product: Product = {
      productName: String(formData.get("productName")),
      productImages: images,
      price: Number(formData.get("price")),
      quantity: Number(formData.get("quantity")),
      description: String(formData.get("description")),
   
    };

    try {
      await addProduct.mutateAsync(product);
      e.currentTarget.reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="p-6 shadow-lg animate-fade-in">
      <h1 className="text-2xl font-bold text-center mb-6">
        {t("addNewProduct")}
      </h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="text-sm font-medium">{t("productName")}</label>
          <Input
            required
            name="productName"
            placeholder={t("enterProductName")}
            className="mt-1"
          />
        </div>
        <div>
          <label className="text-sm font-medium">{t("productImages")}</label>
          <Input
            required
            name="productImages"
            type="file"
            multiple
            accept="image/*"
            className="mt-1"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium">{t("price")}</label>
            <Input
              required
              name="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="0.00"
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t("quantity1")}</label>
            <Input
              required
              name="quantity"
              type="number"
              min="1"
              placeholder="1"
              className="mt-1"
            />
          </div>
        </div>
        <div>
          <label className="text-sm font-medium">{t("description1")}</label>
          <Textarea
            required
            name="description"
            placeholder={t("enterDescription")}
            className="mt-1"
          />
        </div>
       
        <Button
          type="submit"
          className="w-full transition-all duration-300 transform hover:scale-105 active:scale-95"
          disabled={isSubmitting}
        >
          {isSubmitting ? t("addingProduct") : t("addProduct")}
        </Button>
      </form>
    </Card>
  );
};

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen pt-8 px-4 pb-8 bg-gray-50">
      <div className="max-w-6xl mx-auto mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800 mt-14 mx-auto">
          {t("title")}
        </h1>
      </div>
      <div className="max-w-6xl mx-auto mb-8">
        <p className="text-lg text-gray-600 mx-auto ms-60">
          {t("description")}
        </p>
      </div>
      <div className="flex justify-between items-center max-w-6xl mx-auto px-4 mb-8">
        <div className="flex space-x-8 py-4 ms-80 text-center">
          <Link
            to="/"
            className="px-4 py-2 text-sm font-medium text-black hover:text-black transition-colors border-b-2 border-black"
          >
            {t("addProduct")}
          </Link>
          <Link
            to="/view-products"
            className="px-4 py-2 text-sm font-medium text-gray-500 hover:text-black transition-colors hover:border-b-2 hover:border-black"
          >
            {t("viewProducts")}
          </Link>
        </div>
      </div>
      <div className="max-w-lg mx-auto">
        <AddProductForm />
      </div>
    </div>
  );
};

export default Home;
