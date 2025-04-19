import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  ScrollRestoration,
  useLocation,
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster as Sonner } from '../src/components/ui/sonner';
import { TooltipProvider } from '../src/components/ui/tooltip';
import { Toaster } from '../src/components/ui/toaster';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Requests from './pages/Requests';
import Products from './pages/AddProduct';
import Error from './pages/Error';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import { Help } from './pages/Help';
import { BuyerHelp } from './pages/Buyer Dashboard/BuyerHelp';
import Menu from './components/menu/Menu';
import ToasterProvider from './components/ToasterProvider';
import SoldProducts from './pages/SoldProducts';
import BuyerProducts from './pages/Buyer Dashboard/BuyerProducts';
import History from './pages/Buyer Dashboard/History';
import BuyerAnalytics from './pages/Buyer Dashboard/BuyerAnalytics';
// import { BuyerProfile } from './pages/Buyer Dashboard/BuyerProfile';
import BuyerDashboard from './pages/Buyer Dashboard/BuyerDashboard';
import { Farmers } from './pages/Admin/Farmers';
import Buyers from './pages/Admin/Buyers';
import { Issues } from './pages/Admin/Issues';
import { Helpdesk } from './pages/Helpdesk';
import { AdminAnalytics } from './pages/Admin/AdminAnalytics';
import { AdminProfile } from './pages/Admin/AdminProfile';
import Helper from './components/Helper';
import ManageProducts from "./pages/ManageProdcut";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/';

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <ToasterProvider />
        <ScrollRestoration />

        {/* Toastify container for global toasts */}
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Navbar */}
        {!isLoginPage && (
          <div className="fixed top-0 left-0 w-full z-50 bg-green-100">
            <Navbar />
          </div>
        )}

        <div className="flex">
          {/* Sidebar */}
          {!isLoginPage && (
            <div className="hidden xl:block fixed left-0 top-10 w-[250px] 2xl:w-[280px] bg-green-300 border-r-2 px-3 xl:px-4 xl:py-1 min-h-screen">
              <Menu />
            </div>
          )}

          {/* Main Content */}
          <div
            className={`w-full ${!isLoginPage ? 'xl:ml-[250px] 2xl:ml-[280px]' : ''} px-4 xl:px-6 2xl:px-8 overflow-clip`}
          >
            <Outlet />
          </div>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: '/', element: <Login /> },
      { path: ':role/:token', element: <Helper /> },

      { path: '/home', element: <Home /> },
      { path: '/profile', element: <Profile /> },
      { path: '/manageProduct', element: <ManageProducts /> },
      { path: '/sold-products', element: <SoldProducts /> },
      { path: '/analytics', element: <Analytics /> },
      { path: '/view-products', element: <Products /> },
      { path: '/requests', element: <Requests /> },
      { path: '/help', element: <Help /> },
      { path: '/buyer-products', element: <BuyerProducts /> },
      { path: '/history', element: <History /> },
      { path: '/buyer-analytics', element: <BuyerAnalytics /> },
      // { path: '/buyer-profile', element: <BuyerProfile /> },
      { path: '/buyer-dashboard', element: <BuyerDashboard /> },
      { path: '/buyer-help', element: <BuyerHelp /> },
      { path: '/farmers', element: <Farmers /> },
      { path: '/buyers', element: <Buyers /> },
      { path: '/issues', element: <Issues /> },
      { path: '/help-desk', element: <Helpdesk /> },
      { path: '/admin-analytics', element: <AdminAnalytics /> },
      { path: '/admin-profile', element: <AdminProfile /> },
    ],
    errorElement: <Error />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
