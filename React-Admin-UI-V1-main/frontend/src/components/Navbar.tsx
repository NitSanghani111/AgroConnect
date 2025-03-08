import { Link, useNavigate } from 'react-router-dom';
import { HiSearch, HiOutlineBell } from 'react-icons/hi';
import toast from 'react-hot-toast';
import { LanguageSelector } from "../components/LanguageSelector";
import { useTranslation } from '../hooks/useTranslation';

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = localStorage.getItem('role'); // Get the user's role from localStorage
  console.log("role" , role);
  
  return (
    <div className="fixed top-0 left-0 w-full bg-green-300 flex justify-between px-4 py-3 z-50">
      {/* Left - Logo */}
      <div className="flex gap-3 items-center">
        <Link to={'/'} className="flex items-center gap-2">
          <img src='./logo.png' style={{ height: "60px" }} alt="Logo" />
          <span className="text-lg font-semibold text-base-content">
            AgroConnect
          </span>
        </Link>
      </div>

      {/* Right - Navbar Items */}
      <div className="flex items-center gap-4">
        {/* Conditionally render LanguageSelector */}
        {role !== 'admin' && <LanguageSelector />}

        <button onClick={() => toast('Search is disabled!')} className="btn btn-circle btn-ghost">
          <HiSearch className="text-xl" />
        </button>

        <button onClick={() => toast('No notifications!')} className="btn btn-circle btn-ghost">
          <HiOutlineBell className="text-xl" />
        </button>

        {/* Avatar Dropdown */}
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
            {role === 'buyer' ? (
              <div className="w-12 h-12 rounded-full">
                <img src="https://images.unsplash.com/flagged/photo-1573603867003-89f5fd7a7576?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8cHJvZmVzc2lvbmFsJTIwbWFufGVufDB8fDB8fHww" alt="Buyer Avatar" />
              </div>
            ) : role === 'admin' ? (
              <div className="w-12 h-12 rounded-full">
                <img src="https://media-hosting.imagekit.io//523265c6844a4a6c/WhatsApp%20Image%202025-03-01%20at%2023.03.50_d2f3aaec.jpg?Expires=1835458465&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=jEzgDXNo2Zc6RmGADKX~q~WuUZEdW4XSRFkLAMmYaYHOe0zwCQrF0CYo-v-E3R5FB6LkHKbALLytDl~JVkPRDdTzxy-uCgWimii65khMNRVj4Ji7s-2CfEBvKEs7ZVHTNgF~HnPv2uvM1U0p6TzZwSJ5zRd1bqxgaiRnAmsGvVjpzS6PO-PoXLnNO44kPUOGjzKUezlJxYYly9KGIc2DSaSgxtgHLPyBUlpeUulpwIzAbcuF8HnfqKeoy0zIywK3YGYVsPElp21mTymoKRLjaF2fIuDqh1FHvswDY~Zjh8OhQ6qLmIwADYLhJ9rw94BB8I7fRcaf~-2Ln~3ZS39NKw__" alt="Admin Avatar" />
              </div>
            ) : (
              <div className="w-9 rounded-full">
                <img src="https://images.pexels.com/photos/12903019/pexels-photo-12903019.jpeg?auto=compress&cs=tinysrgb&w=600" alt="User  Avatar" />
              </div>
            )}
          </div>
          <ul tabIndex={0} className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40">
            {/* Conditional rendering based on user role */}
            {role === 'buyer' ? (
              <Link to={'/buyer-profile'}>
                <li>&nbsp;&nbsp;&nbsp;{t('My Profile')}</li>
              </Link>
            ) : role === 'admin' ? (
              <Link to={'/admin-profile'}>
                <li>&nbsp;&nbsp;&nbsp;My Profile</li>
              </Link>
            ) : (
              <Link to="/profile">
                <li>&nbsp;&nbsp;{t('My Profile')}</li>
              </Link>
            )}
            <li onClick={() => {
              localStorage.removeItem('role'); // Clear the role on logout
              navigate('/'); // Redirect to login
            }}>
              <a>{t('Log Out')}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar; 
