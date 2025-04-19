import { Link, useNavigate } from "react-router-dom";
import { HiSearch, HiOutlineBell } from "react-icons/hi";
import toast from "react-hot-toast";
import { LanguageSelector } from "../components/LanguageSelector";
import { useTranslation } from "../hooks/useTranslation";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRecoilValue } from "recoil";
import roleAtom from "../hooks/roleAtom";

interface User {
  profilePhoto?: string;
}

const Navbar = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const role = useRecoilValue(roleAtom); // instead of localStorage directly
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");
  const profilePicUrl = user?.profilePhoto || "/default-avatar.png";

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!token) {
        navigate("/localhost:5173/login");
        return;
      }

      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setUser(response.data.user);
        console.log("Token:", localStorage.getItem("token"));

      } catch (error: unknown) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, [navigate, token]);

  return (
    <div className="fixed top-0 left-0 w-full bg-green-300 flex justify-between px-4 py-3 z-50">
      <div className="flex gap-3 items-center">
        <img src="/logo.png" style={{ height: "50px" }} alt="Logo" />
        <span className="text-lg font-semibold text-base-content">
          AgroConnect
        </span>
      </div>

      <div className="flex items-center gap-4">
        {role !== "admin" && <LanguageSelector />}

        <button
          onClick={() => toast("Search is disabled!")}
          className="btn btn-circle btn-ghost"
        >
          <HiSearch className="text-xl" />
        </button>

        <button
          onClick={() => toast("No notifications!")}
          className="btn btn-circle btn-ghost"
        >
          <HiOutlineBell className="text-xl" />
        </button>

        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <img
              src={profilePicUrl}
              alt="User Avatar"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <ul
            tabIndex={0}
            className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-40"
          >
            <Link to="/profile">
              <li>{t("My Profile")}</li>
            </Link>
            <li
              onClick={() => {
                localStorage.clear();
                window.location.href = "http://localhost:5173/login";

              }}
            >
              <a>{t("Log Out")}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
