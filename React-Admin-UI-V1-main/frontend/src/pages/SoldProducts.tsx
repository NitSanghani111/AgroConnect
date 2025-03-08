import { useTranslation } from "../hooks/useTranslation";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../components/ui/table";
import LanguageSwitcher from "../components/LanguageSwitcher";

const SoldProducts = () => {
  const { t } = useTranslation();
  
  const soldProducts = [
    {
      id: '1',
      productName: 'tomatoes',
      buyerName: 'johnDoe',
      quantitySold: 50,
      saleDate: '2023-10-01',
      farmerName: 'farmerBob',
      price: 200,
    },
    {
      id: '2',
      productName: 'potatoes',
      buyerName: 'janeSmith',
      quantitySold: 30,
      saleDate: '2023-10-02',
      farmerName: 'farmerAlice',
      price: 150,
    },
    {
      id: '3',
      productName: 'carrots',
      buyerName: 'michaelJohnson',
      quantitySold: 20,
      saleDate: '2023-10-03',
      farmerName: 'farmerCharlie',
      price: 100,
    },
    {
      id: '4',
      productName: 'lettuce',
      buyerName: 'emilyDavis',
      quantitySold: 15,
      saleDate: '2023-10-04',
      farmerName: 'farmerDavid',
      price: 80,
    },
    {
      id: '5',
      productName: 'cucumbers',
      buyerName: 'sarahWilson',
      quantitySold: 25,
      saleDate: '2023-10-05',
      farmerName: 'farmerEve',
      price: 120,
    },
  ];

  return (
    <div className="min-h-screen pt-24 px-4 pb-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold mx-auto">{t('soldProducts')}</h1>
          
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <Table className="min-w-full">
              <TableHeader>
                <TableRow>
                  <TableHead>{t('productName')}</TableHead>
                  <TableHead>{t('buyerName')}</TableHead>
                  <TableHead>{t('quantitySold')}</TableHead>
                  <TableHead>{t('saleDate')}</TableHead>
                  <TableHead>{t('farmerName')}</TableHead>
                  <TableHead>{t('price')}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {soldProducts.length > 0 ? (
                  soldProducts.map((product) => (
                    <TableRow 
                      key={product.id} 
                      className="hover:bg-gray-50"
                    >
                      <TableCell className="font-medium">{t(product.productName)}</TableCell>
                      <TableCell>{t(product.buyerName)}</TableCell>
                      <TableCell>{product.quantitySold}</TableCell>
                      <TableCell>{product.saleDate}</TableCell>
                      <TableCell>{t(product.farmerName)}</TableCell>
                      <TableCell>{product.price} ₹</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      {t('noSoldProducts')}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SoldProducts;