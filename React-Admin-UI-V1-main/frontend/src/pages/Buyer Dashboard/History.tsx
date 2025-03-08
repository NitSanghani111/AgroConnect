import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Badge } from "../../components/ui/badge";
import { useTranslation } from "../../hooks/useTranslation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const History = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  interface PurchaseDetails {
    id: string;
    productName: string;
    buyerName: string;
    quantitySold: number;
    saleDate: string;
    farmerName: string;
    price: string;
    status: "Delivered" | "In Transit" | "Processing";
    paymentMethod: string;
    deliveryAddress: string;
  }

  const purchaseDetails: PurchaseDetails[] = [
    {
      id: "1",
      productName: "Tomatoes",
      buyerName: t('buyers1.john_doe'),
      quantitySold: 50,
      saleDate: "2023-10-01",
      farmerName: t('farmers.farmer_bob'),
      price: "₹2500",
      status: "Delivered",
      paymentMethod: t('paymentMethods.cash_on_delivery'),
      deliveryAddress: t('deliveryAddresses.123 Main St, Mumbai, Maharashtra'),
    },
    {
      id: "2",
      productName: "Potatoes",
      buyerName: t('buyers1.alice_smith'),
      quantitySold: 30,
      saleDate: "2023-10-02",
      farmerName: t('farmers.farmer_joe'),
      price: "₹1200",
      status: "In Transit",
      paymentMethod: t('paymentMethods.online_payment'),
      deliveryAddress: t('deliveryAddresses.456 Elm St, Pune, Maharashtra'),
    },
    {
      id: "3",
      productName: "Carrots",
      buyerName: t('buyers1.bob_johnson'),
      quantitySold: 20,
      saleDate: "2023-10-03",
      farmerName: t('farmers.farmer_alice'),
      price: "₹800",
      status: "Processing",
      paymentMethod: t('paymentMethods.cash_on_delivery'),
      deliveryAddress: t('deliveryAddresses.789 Pine St, Bangalore, Karnataka'),
    },
    {
      id: "4",
      productName: "Onions",
      buyerName: t('buyers1.charlie_brown'),
      quantitySold: 25,
      saleDate: "2023-10-04",
      farmerName: t('farmers.farmer_charlie'),
      price: "₹600",
      status: "Delivered",
      paymentMethod: t('paymentMethods.online_payment'),
      deliveryAddress: t('deliveryAddresses.321 Oak St, Hyderabad, Telangana'),
    },
    {
      id: "5",
      productName: "Garlic",
      buyerName: t('buyers1.daisy_white'),
      quantitySold: 10,
      saleDate: "2023-10-05",
      farmerName: t('farmers.farmer_daisy'),
      price: "₹300",
      status: "In Transit",
      paymentMethod: t('paymentMethods.cash_on_delivery'),
      deliveryAddress: t('deliveryAddresses.654 Maple St, Chennai, Tamil Nadu'),
    },
  ];
  
  const getStatusTranslationKey = (status: string) => {
    // Convert "In Transit" to "intransit" for translation key
    return status.toLowerCase().replace(/\s+/g, '');
  };

  return (
    <div className="min-h-screen bg-gray-50 mx-0">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            {t('purchaseDetails.backButton')}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <div className="rounded-xl overflow-hidden">
            <div className="relative h-30 md:h-64">
              <div className="absolute inset-0" />
              <div className="absolute bottom-4 left-4 text-blue-600">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  {t('purchaseDetails.title')}
                </h1>
              </div>
            </div>

            <div className="p-6 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.orderId')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.productName')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.buyerName')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.quantity')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.saleDate')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.farmerName')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.price')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.status')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.paymentMethod')}</TableHead>
                    <TableHead className="text-center whitespace-nowrap">{t('purchaseDetails.tableHeaders.deliveryAddress')}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseDetails.map((detail) => (
                    <TableRow key={detail.id}>
                      <TableCell className="text-center whitespace-nowrap">{detail.id}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{t(`products1.${detail.productName.toLowerCase()}`)}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.buyerName}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.quantitySold} kg</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.saleDate}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.farmerName}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.price}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">
                        <Badge className={detail.status === "Delivered" ? "bg-green-500" : "bg-yellow-500"}>
                          {t(`purchaseDetails.status.${getStatusTranslationKey(detail.status)}`)}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.paymentMethod}</TableCell>
                      <TableCell className="text-center whitespace-nowrap">{detail.deliveryAddress}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default History;